import { girdle } from '../../utils/index'

export default girdle({
  tabButton: {
    fontWeight: 'bold',
    textDecoration: 'none',
    borderRadius: '5px 5px 0 0',
    backgroundClip: 'padding-box',
    display: 'inline-block',
    cursor: 'pointer',
    background: '#6e6c64',
    padding: 10,
    color: 'white',
    fontSize: '13px',
    lineHeight: '15px',
    marginRight: '4px',
    getState(isSelected, isDisabled) {

      return [
        isSelected && 'selected',
        isDisabled && 'disabled'
      ]

    },
    states: {
      selected: {
        backgroundColor: '#FFFFFF',
        border: 'none',
        padding: '10px',
        position: 'relative',
        color: 'black',
        bottom: 0
      }
    }
  }
})


