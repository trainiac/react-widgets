import styles from 'styles'

export default styles.add({
  key: {
    background: '#706E66',
    transition: 'background-color 0.2s ease-out',
    borderBottom: '1px solid #C2C1BB',
    ':first-child': {
      borderRadius: '5px 5px 0 0',
      backgroundClip: 'padding-box'
    },
    ':last-child': {
      borderRadius: '0 0 5px 5px',
      backgroundClip: 'padding-box',
      borderBottom: 'none'
    },
    ':hover': {
      background: '#848278'
    }
  },
  keyOpen: {
    background: '#9E9B90',
    paddingBottom: 10,
    ':hover': {
      background: '#9E9B90'
    }
  },
  keyHeader: {
    position: 'relative',
    cursor: 'pointer'
  },
  keyHeaderTitle: {
    fontSize: '14px',
    textShadow: '0 -1px 0 rgba(68, 68, 68, 0.4)',
    lineHeight: '16px',
    margin: 0,
    ':before': {
      content: '""',
      width: 0,
      height: 0,
      borderTop: '4px solid transparent',
      borderLeft: '8px solid #FFF',
      borderBottom: '4px solid transparent',
      position: 'absolute',
      top: 16,
      left: 11,
      display: 'inline-block'
    }
  },
  keyHeaderTitleOpen: {
    ':before': {
      transform: 'rotate(90deg)'
    }
  },
  keyHeaderButton: {
    display: 'block',
    padding: '11px 36px 11px 28px',
    color: '#fff',
    textTransform: 'uppercase',
    outline: 0,
    ':hover': {
      textDecoration: 'none'
    }
  },
  keyContent: {
    color: 'white',
    padding: '0 10px',
    transition: 'height 0.2s ease-out',
    '::-webkit-scrollbar': {
      width: 8
    },
    '::-webkit-scrollbar-track': {
      boxShadow: '  inset 0 0 6px rgba(0, 0, 0, 0.3)',
      borderRadius: '12px'
    },
    '::-webkit-scrollbar-thumb': {
      boxShadow: 'inset 0 0 6px rgba(0, 0, 0, 0.5)',
      borderRadius: '12px',
      background: '#333'
    }
  }
}).get()

