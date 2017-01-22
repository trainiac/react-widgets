import fp from 'lodash/fp'

export const filterCap = fp.curry((cap, testFunc, arr) => {

  const filtered = []

  for (const item of arr) {

    if (testFunc(item)) {

      filtered.push(item)

      if (filtered.length === cap) {

        break

      }

    }

  }

  return filtered

})

export const maybe = fp.curry((func, arr) => {

  if (arr) {

    return func(arr)

  }

  return arr

})
