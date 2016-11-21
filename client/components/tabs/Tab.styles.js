import { girdle } from '../../utils/index'

export default girdle({
  tabPane: {
    position: 'absolute',
    top: '-9999px',
    left: '-9999px',
    getState: (isSelected) => [
      isSelected && 'selected'
    ],
    states: {
      selected: {
        position: 'static'
      }
    }
  }
})
