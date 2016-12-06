import React, { PropTypes } from 'react'
import Draggable from 'HOC/Draggable'
import styles from 'components/slider/SliderHandle.styles'
import { css } from 'utils/styles'

@Draggable(props => ({
  onDrag: props.onDrag,
  onDragStart: props.onDragStart,
  onDragEnd: props.onDragEnd
}))
class SliderHandle extends React.PureComponent {

  static propTypes = {
    // TODO make showingLabel customizable
    showLabel: PropTypes.bool,
    type: PropTypes.oneOf(['value', 'minValue', 'maxValue']),
    labelMessage: PropTypes.string,
    draggable: PropTypes.object,
    offsetLeft: PropTypes.number,
    onKeyUp: PropTypes.func,
    onKeyDown: PropTypes.func
  }

  static defaultProps = {
    showLabel: false,
    type: 'value',
    labelMessage: '0',
    offsetLeft: 0
  }


  render() {

    const {
      labelMessage,
      type,
      showLabel,
      draggable,
      offsetLeft,
      onKeyDown,
      onKeyUp
    } = this.props

    return (
      <button
        data-handle-type={type}
        className={css(
            styles.btn,
            styles.handle
          )}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        onMouseDown={draggable.handleMouseDown}
        style={{ left: `${offsetLeft}%` }}
      >
        {showLabel && (
          <span className={css(styles.label, styles.corner)}>
            {labelMessage}
          </span>
        )}
      </button>
    )

  }

}

export default SliderHandle
