import styles from 'styles'

const menuWidth = 175
const wrapperPadding = 15
const imageDimension = 100

const pageStyles = styles.add({
  wrapper: {
    padding: wrapperPadding,
    paddingLeft: wrapperPadding + menuWidth
  },
  title: {
    fontSize: '70px',
    color: '#5B5A4B',
    margin: '20px 0'
  },
  container: {
    padding: 10
  },
  img: {
    margin: '0 auto',
    maxWidth: imageDimension,
    maxHeight: imageDimension
  },
  menu: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: menuWidth,
    backgroundColor: 'tomato',
    padding: 10,
    zIndex: 100,
    boxSizing: 'border-box'
  },
  menuLink: {
    display: 'block',
    marginBottom: 10,
    color: 'white',
    fontWeight: 'bold'
  },
  menuLinkSelected: {
    color: '#777'
  }

})

export default pageStyles.get()
