import { negate } from 'utils/functional'
import fp from 'lodash/fp'

const matches = fp.curry((selection, el) => {
  const matchFunc = (
    el.matches ||
    el.webkitMatchesSelector ||
    el.mozMatchesSelector ||
    el.msMatchesSelector
  )

  if (fp.isString(selection)) {
    return matchFunc.call(el, selection)
  }

  if (fp.isElement(selection)) {
    return selection === el
  }

  return false
})

const elementToChildren = selection => fp.flow(
  fp.prop('children'),
  fp.toArray,
  fp.filter(selection ? matches(selection) : fp.identity)
)

const walkUntil = (scopeEl, func) => {
  if(func(scopeEl)){
    return scopeEl
  }

  const children = elementToChildren(null, scopeEl)
  for(const child of children){
    if(walkUntil(child, func)){
      return child
    }
  }

  return null
}

const findWithinElement = fp.curry((selection, scopeEl) => {

  if(fp.isElement(selection)){
    const element = walkUntil(scopeEl, fp.eq(selection))
    return element ? [ element ] : []
  }

  if(fp.isString(selection)){
    return fp.flow(
      scopeEl.querySelectorAll,
      fp.toArray
    )(selection)
  }

  return []

})

const elementToSiblings = fp.curry((selection, element) => {
  let sibling = element.parentNode.firstChild
  const siblings = []
  while (sibling) {

    if (!matches(sibling, element)) {
      if (!selection) {
        siblings.push(sibling)
      } else if (matches(selection, sibling)) {
        siblings.push(sibling)
      }
    }

    sibling = sibling.nextSibling
  }

  return siblings
})

const elementToNext = el => {
  const siblings = elementToSiblings(null, el)
  const index = siblings.indexOf(el) + 1
  return fp.nth(index, siblings)
}

const elementToNextAll = el => {
  const siblings = elementToSiblings(null, el)
  const index = siblings.indexOf(el) + 1
  return siblings.slice(index)
}

const elementToPrev = el => {
  const siblings = elementToSiblings(null, el)
  const index = siblings.indexOf(el) - 1
  if (index < 0) {
    return undefined
  }
  return fp.nth(index, siblings)
}

const elementToPrevAll = el => {
  const siblings = elementToSiblings(null, el)
  const index = siblings.indexOf(el)
  return siblings.slice(0, index)
}

const elementToClosest = fp.curry((selection, scopeEl, el) => {

  let parent = el

  while (parent) {

    if (matches(selection, parent)) {
      return parent
    }

    if (matches(scopeEl, parent)) {
      break
    }

    parent = parent.parentElement
  }

  return null
})


const elementToAncestors = fp.curry((selection, scopeEl, el) => {
  let parent = el
  const parents = []
  while (parent) {
    if (selection) {
      if (matches(selection, parent)) {
        parents.push(parent)
      }
    } else {
      parents.push(parent)
    }

    if(matches(parent, scopeEl)){
      break
    }

    parent = parent.parentElement
  }

  return parents
})

const isAncestor = (childEl, scopeEl) => fp.flow(
  elementToAncestors(childEl, scopeEl),
  fp.size
)

const elementHas = fp.curry((selection, scopeEl) => {

  if (fp.isElement(selection)) {
    return isAncestor(selection, scopeEl)
  }

  if (fp.isString(selection)) {
    return fp.flow(
      findWithinElement(selection),
      fp.size
    )
  }

  return negate
})

const has = (elements, selection, scopeEl) => {
  return fp.filter(elementHas(selection, scopeEl), elements)
}

const find = (elements, selection) => fp.flow(
  fp.map(findWithinElement(selection)),
  fp.flatten
)(elements)

const remove = selection => fp.remove(matches(selection))
const filter = selection => fp.filter(matches(selection))

const siblings = (elements, selection) => fp.flow(
  fp.map(elementToSiblings(selection)),
  fp.flatten,
  fp.uniq
)(elements)

const next = fp.flow(
  fp.map(elementToNext),
  fp.compact
)

const nextAll = fp.flow(
  fp.map(elementToNextAll),
  fp.flatten,
  fp.uniq
)

const prev = fp.flow(
  fp.map(elementToPrev),
  fp.compact
)

const prevAll = fp.flow(
  fp.map(elementToPrevAll),
  fp.flatten,
  fp.uniq
)

const closest = (elements, selection, scopeEl) => fp.flow(
  fp.map(elementToClosest(selection, scopeEl)),
  fp.compact
)(elements)

const parents = (elements, selection) => fp.flow(
  fp.map(fp.prop('parentElement')),
  fp.compact,
  fp.uniq,
  fp.filter(selection ? matches(selection) : fp.identity)
)(elements)

const ancestors = (elements, selection, scopeEl) => fp.flow(
  fp.map(elementToAncestors(selection, scopeEl)),
  fp.flatten,
  fp.uniq
)(elements)

const children = selection => fp.map(elementToChildren(selection))

// TODO
// Could implement
//   .next(selection) gets one node that matches the selection
//   .nextUntil(el, filter) gets all until el with option to filter
//   .prev(selection) gets one node that matches the selection
//   .prevUntil(el, filter) gets all until el with option to filter

const DOM = selection => {

  let stack

  const methods = stack => {

    const chain = elements => {
      return methods([
        ...stack,
        elements
      ])
    }

    return {
      element(index = 0) {
        return fp.nth(index, this.elements())
      },
      elements() {
        return fp.nth(-1, stack) || []
      },
      size() {
        return this.elements().length
      },
      data(key) {  // eslint-disable-line id-blacklist
        const el = this.element()
        return fp.prop(`dataset.${key}`, el)
      },
      dimensions() {
        const el = this.element()

        if (!el) {
          return undefined
        }

        const rect = el.getBoundlingClientRect()

        return {
          innerWidth: el.clientWidth,
          innerHeight: el.clientHeight,
          scrollWidth: el.scrollWidth,
          scrollHeight: el.scrolHeight,
          outerHeight: el.offsetWidth,
          outerWidth: el.offsetHeight,
          rectHeight: rect.height,  // only different from offset when transform applied
          rectWidth: rect.width     // only different from offset when transform applied
        }
      },
      position() {
        const el = this.element()

        if (!el) {
          return undefined
        }

        const rect = el.getBoundlingClientRect()

        return {
          top: rect.top + window.pageXOffset,
          left: rect.left + window.pageYOffset,
          offsetParent: el.offsetParent,
          offsetLeft: el.offsetLeft,
          offsetRight: el.offsetRight,
          scrollTop: el.scrollTop,
          scrollLeft: el.scrollLeft
        }
      },
      positonRelativeTo(selection) {
        const position = this.position()

        if (!position) {
          return undefined
        }

        const relativePosition = DOM(selection).position()
        if(relativePosition){
          return undefined
        }

        return {
          top: relativePosition.top - position.top,
          left: relativePosition.left - position.left
        }

      },
      index(selection, scopeEl) {
        let element
        let elements

        if (fp.isElement(selection)) {
          element = selection
          elements = this.elements()
        } else if(fp.isString(selection)) {
          element = this.element()
          elements = findWithinElement(selection, scopeEl || document)
        } else {
          element = this.element()
          elements = elementToSiblings(null, element)
        }

        return fp.indexOf(element, elements)
      },
      is(selection) {
        return fp.some(matches(selection), this.elements())
      },
      end() {
        return methods(fp.initial(stack))
      },
      eq(index){
        const element = this.element(index)
        const elements = element ? [ element ] : []
        return chain(elements)
      },
      first() {
        const element = this.element()
        const elements = element ? [ element ] : []
        return chain(elements)
      },
      last() {
        const element = this.element(-1)
        const elements = element ? [ element ] : []
        return chain(elements)
      },
      has(selection, scopeEl) {
        const elements = has(this.elements(), selection, scopeEl)
        return chain(elements)
      },

      slice(args) {
        const elements = this.elements().slice(...args)
        return chain(elements)
      },

      siblings(selection) {
        const elements = siblings(this.elements(), selection)
        return chain(elements)
      },
      next() {
        const elements = next(this.elements()) // eslint-disable-line callback-return
        return chain(elements)
      },
      nextAll() {
        const elements = nextAll(this.elements())
        return chain(elements)
      },
      prev() {
        const elements = prev(this.elements())
        return chain(elements)
      },
      prevAll() {
        const elements = prevAll(this.elements())
        return chain(elements)
      },
      closest(selection, scopeEl) {
        const elements = closest(this.elements(), selection, scopeEl || document.body)
        return chain(elements)
      },
      children(selection) {
        const elements = children(this.elements(), selection)
        return chain(elements)
      },
      not(selection) {
        const elements = remove(this.elements(), selection)
        return chain(elements)
      },
      filter(selection) {
        const elements = filter(this.elements(), selection)
        return chain(elements)
      },
      find(selection) {
        const elements = find(this.elements(), selection)
        return chain(elements)
      },
      parents(selection) {
        const elements = parents(this.elements(), selection)
        return chain(elements)
      },
      ancestors(selection, scopeEl) {
        const elements = ancestors(this.elements(), selection, scopeEl)
        return chain(elements)
      }
    }
  }

  if (fp.isElement(selection)) {
    stack = [ [selection] ]
  } else if (fp.isString(selection)) {
    stack = [ findWithinElement(selection, document) ]
  }

  return methods(stack)
}

export const onlyIf = (selector, handler, options = {}) => {

  return e => {

    if (
      options.not &&
      DOM(e.target).closest(options.not, e.currentTarget).size() > 0
    ) {
      return
    }

    const target = DOM(e.target).closest(selector, e.currentTarget).element()
    if (target) {
      handler(e, target)
    }

  }

}

