import { girdle } from '../../utils/index'

export default girdle({
  tabs: {
    margin: '0 0 20px 0',
    borderRadius: '5px',
    backgroundClip: 'padding-box',
    background: '#c3c3bd',
    padding: '10px 2px 2px'
  },
  tabButtons: {
    border: 0,
    padding: '0 10px',
    margin: 0,
    helpers: ['clearfix']
  },
  tabPanes: {
    borderRadius: 5,
    backgroundClip: 'padding-box',
    background: 'white',
    padding: 18
  }
})
