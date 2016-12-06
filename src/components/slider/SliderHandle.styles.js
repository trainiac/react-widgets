import styles from 'styles'

const label = {
  height: 22,
  width: 30
}

const handle = {
  dim: 14
}

export default styles.add({
  handle: {
    position: 'absolute',
    cursor: 'default',
    top: 0,
    margin: '-4px 0 0 -8px',
    height: handle.dim,
    width: handle.dim,
    padding: 0,
    zIndex: 5,
    userSelect: 'none',
    outline: 'none'
  },
  label: {
    position: 'relative',
    zIndex: 6,
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    textAlign: 'center',
    display: 'inline-block',
    lineHeight: `${label.height}px`,
    width: label.width,
    top: -(label.height + 5),
    left: -((label.width - handle.dim) / 2) - 2
  }
}).get()
