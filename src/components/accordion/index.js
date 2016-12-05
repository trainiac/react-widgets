import React, { PureComponent, cloneElement, PropTypes } from 'react'
import fp from 'lodash/fp'

import { isTypeComponent } from 'utils/react'


const transform = fp.transform.convert({ cap: false })


const findKeyComponents = fp.filter(isTypeComponent('AccordionKey'))


const toKeyComponentArray = children =>
  findKeyComponents(React.Children.toArray(children))


const componentsToIsOpenState = fp.transform((next, key) => {

  next[key.props.keyId] = Boolean(key.props.isOpen)

  return next

})({})


const mapKeysToIsOpenState = fp.flow(
  toKeyComponentArray,
  componentsToIsOpenState
)


const getTruthyKeys = fp.flow(
  fp.pickBy(fp.identity),
  fp.keys
)


function maybeHead(arr) {

  return arr.length ? fp.head(arr) : null

}


const getFirstTruthyKey = fp.flow(
  getTruthyKeys,
  maybeHead
)


export default class Accordion extends PureComponent {

  constructor(props) {

    super(props)

    const keysOpenState = mapKeysToIsOpenState(this.props.children)

    this.state = {
      keysOpenState
    }

  }

  isKeyOpen(keyId) {

    return this.state.keysOpenState[keyId]

  }

  componentWillUpdate(nextProps, nextState) {

    const state = this.state
    const { keyWillClose, keyWillOpen } = this.props

    if (nextState.keysOpenState !== state.keysOpenState) {

      const changes = this.getKeysOpenChanges(nextState.keysOpenState, 'will')

      if (changes.willClose) {

        keyWillClose(changes.willClose)

      }

      if (changes.willOpen) {

        keyWillOpen(changes.willOpen)

      }

    }

  }

  componentDidUpdate(prevProps, prevState) {

    const state = this.state
    const { keyDidClose, keyDidOpen } = this.props

    if (prevState.keysOpenState !== state.keysOpenState) {

      const changes = this.getKeysOpenChanges(prevState.keysOpenState, 'did')

      if (changes.didClose) {

        keyDidClose(changes.didClose)

      }

      if (changes.didOpen) {

        keyDidOpen(changes.didOpen)

      }

    }

  }

  getKeysOpenChanges(keysOpenState, tense) {

    const self = this

    return transform((next, isOpen, keyId) => {

      if (isOpen !== self.state.keysOpenState[keyId]) {

        if (isOpen && tense === 'will') {

          next.willOpen = keyId

        } else if (isOpen && tense === 'did') {

          next.didClose = keyId

        } else if (!isOpen && tense === 'will') {

          next.willClose = keyId

        } else if (!isOpen && tense === 'did') {

          next.didOpen = keyId

        }

      }

      return next

    })({})(keysOpenState)

  }

  onKeyHeaderClick(keyId, isOpen) {

    const newKeysOpenState = { ...this.state.keysOpenState }

    if (isOpen) {

      newKeysOpenState[keyId] = false

    } else if (this.props.multiOpen) {

      newKeysOpenState[keyId] = true

    } else {

      const openKeyId = getFirstTruthyKey(this.state.keysOpenState)

      if (openKeyId) {

        newKeysOpenState[openKeyId] = false

      }

      newKeysOpenState[keyId] = true

    }

    this.setState({
      keysOpenState: newKeysOpenState
    })

  }

  renderKeys() {

    const self = this
    const keyComponents = toKeyComponentArray(this.props.children)

    return fp.map(keyComponent => {

      const keyId = keyComponent.props.keyId

      return cloneElement(
        keyComponent,
        {
          onHeaderClick: this.onKeyHeaderClick.bind(this),
          key: keyId,
          isOpen: self.isKeyOpen(keyId)
        }
      )

    })(keyComponents)

  }

  render() {

    return (
      <div className={this.props.className}>
        {this.renderKeys()}
      </div>
    )

  }

}


Accordion.propTypes = {
  keyDidClose: PropTypes.func,
  keyWillClose: PropTypes.func,
  keyDidOpen: PropTypes.func,
  keyWillOpen: PropTypes.func,
  multiOpen: PropTypes.bool,
  className: PropTypes.string
}

Accordion.defaultProps = {
  keyDidClose: fp.noop,
  keyDidOpen: fp.noop,
  keyWillClose: fp.noop,
  keyWillOpen: fp.noop,
  multiOpen: false
}
