
const activeButton = {
  borderColor: '#999',
  backgroundColor: '#dcded5',
  background: 'linear-gradient(to bottom, #dcded5, #f5f5ee)'
}

const disabledButton = {
  borderColor: '#BBB',
  backgroundColor: '#f0f0ea',
  background: 'linear-gradient(to bottom, #f0f0ea, #d5d7ce)'
}

export default ({
  btn: {
    padding: '6px 13px',
    borderRadius: '4px',
    backgroundClip: 'padding-box',
    textShadow: '0 1px 0 white',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    textDecoration: 'none !important',
    color: '#333',
    display: 'inline-block',
    border: 'solid 1px #BBB',
    backgroundColor: '#f0f0ea',
    background: 'linear-gradient(to bottom, #f0f0ea, #d5d7ce)',
    position: 'relative',
    ':hover': {
      zIndex: 1,
      textDecoration: 'none',
      borderColor: '#999',
      backgroundColor: '#f5f5ee',
      background: 'linear-gradient(to bottom, #f5f5ee, #dcded5)'
    },
    ':active': activeButton
  },
  btnActive: activeButton,
  btnDisabled: {
    ':hover': disabledButton,
    ':active': disabledButton,
    ':disabled': disabledButton
  },
  btnMenu: {
    letterSpacing: '-0.31em',
    whiteSpace: 'nowrap'
  },
  btnMenuBtn: {
    letterSpacing: 'normal',
    wordSpacing: 'normal',
    verticalAlign: 'top'
  },
  btnMenuRight: {
    marginLeft: -1,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0
  },
  btnMenuLeft: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  btnMenuMiddle: {
    borderRadius: 0,
    backgroundClip: 'padding-box',
    marginLeft: -1
  },
  flatBtn: {
    outline: 'none',
    textAlign: 'center',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 'normal',
    padding: '4px 10px',
    borderRadius: '3px',
    backgroundClip: 'padding-box',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none !important',
    color: '#333333',
    display: 'inline-block',
    border: 'none',
    position: 'relative',
    textShadow: 'none'
  }
})