import { isValidElement } from 'react'
import fp from 'lodash/fp'

export const isTypeComponent = type => child =>
  isValidElement(child) && fp.get('type.displayName')(child) === type
