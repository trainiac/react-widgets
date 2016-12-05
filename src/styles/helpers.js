export default ({
  clearfix: {
    ':after': {
      visibility: 'hidden',
      display: 'block',
      fontSize: 0,
      content: '" "',
      clear: 'both',
      height: 0
    },
    display: 'block'
  },
  disabled: {
    opacity: 0.5,
    cursor: 'default !important'
  },
  transparent: {
    zoom: 1,
    opacity: 0
  },
  hide: {
    display: 'none !important'
  },
  screenReaderText: {
    position: 'absolute',
    top: -9999,
    left: -9999
  },
  cloak: {
    visibility: 'hidden'
  },
  txtShadowLt: {
    textShadow: '0 1px 0 white'
  },
  txtShadowDark: {
    textShadow: '0 -1px 0 rgba(68, 68, 68, 0.4)'
  },
  fadeable: {
    transition: 'opacity 200ms linear'
  },
  truncate: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  wordBreak: {
    wordWrap: 'break-word',
    whiteSpace: 'normal',
    display: 'block'
  },
  preserveWhitespace: {
    whiteSpace: 'pre-wrap'
  },
  noBorder: {
    ':hover': {
      border: '0 !important'
    },
    border: '0 !important'
  },
  shadow: {
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.25)'
  }
})