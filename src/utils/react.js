import { isValidElement } from 'react'
import fp from 'lodash/fp'

export const ref = (context, propName) =>
   ({
     ref: el => context[propName] = el // eslint-disable-line no-return-assign
   })

export const isTypeComponent = type => child =>
  isValidElement(child) && fp.get('type.displayName')(child) === type
