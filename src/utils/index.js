import _ from 'lodash/fp'
import { isValidElement } from 'react'
import { girdleGlobals } from './girdle'

const getProps = props => obj => _.map(prop => _.get(prop)(obj))(props)

const callWithProps = (func, props) => container =>
  func(...getProps(props)(container))

export const ref = (context, propName) =>
   ({
     ref: el => context[propName] = el // eslint-disable-line no-return-assign
   })


export const withContainer = (func, props, key) => container => {

  const result = callWithProps(func, props)(container)

  if (key) {

    return {
      ...container,
      [key]: result
    }

  }

  return result

}


export const isTypeComponent = type => child =>
  isValidElement(child) && _.get('type.displayName')(child) === type

export const trace = (tag, func) => input => {

  const value = func(input)

  console.log(tag, value)  // eslint-disable-line no-console

  return value

}

export const girdle = girdleGlobals({
  clearfix: {
    ':after': {
      visibility: 'hidden',
      display: 'block',
      fontSize: 0,
      content: '" "',
      clear: 'both',
      height: 0
    }
  },
  disabled: {
    opacity: 0.5
  }
})
