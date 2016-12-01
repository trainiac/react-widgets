import { styleSheet } from 'utils/styles'

export default styleSheet({
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
