import React, { PropTypes } from 'react'
import fp from 'lodash/fp'
import invariant from 'invariant'
import keycode from 'keycode'

import { css } from 'utils/styles'
import BaseReact from 'HOC/BaseReact'
import SliderHandle from 'components/slider/SliderHandle'
import styles from 'components/slider/Slider.styles'

/*
  readup on
    document.onselectstart = null;
    document.ondragstart = null;

  handleResizing the window
  clean up code where possible
  clean up demo code

  should accept a labelComponent that will receive
    isDragging
    value
*/

class Slider extends React.PureComponent {

  constructor(props) {

    super(props)

    const range = props.max - props.min

    invariant(
      props.step >= 0,
      `Your step (${props.step}) must be greater than or
      equal to 0.`
    )

    invariant(
      (range % props.step) === 0,
      `The difference of your min (${props.min})
       max (${props.max})  must be divisible by your
       step (${props.step}) `
    )

    let state = {
      value: props.value
    }

    if (props.isRange) {

      state = {
        minValue: props.minValue,
        maxValue: props.maxValue
      }

    }

    this.state = state

  }

  componentDidMount() {

    setTimeout(() => {

      this.calculateLayout()
      this.forceUpdate()

    }, 0)

  }

  handleDragStart(e, handle) {

    this.calculateLayout()
    this.startDragValue = this.state.value

  }

  handleDrag(e, handle) {

    const handleType = handle.dataset.handleType
    const position = e.pageX - this.spacing.left

    let value = this.positionToValue(position)
    value = this.constrainValue(handleType, value)

    this.setState({
      [handleType]: value
    })

  }

  handleDragEnd(e, handle) {

    const handleType = handle.dataset.handleType
    if (this.state[handleType] !== this.startDragValue) {

      this.startDragValue = null
      this.props.onChange(this.getData())

    }

  }

  handleKeyDown(e) {

    const kc = e.keyCode
    const handleType = e.currentTarget.dataset.handleType

    if (![keycode('left'), keycode('right')].includes(kc)) {

      return

    }

    this.startKeyValue = this.state[handleType]

    if (kc === keycode('left')) {

      this.setState(prevState => ({
        [handleType]: this.constrainValue(
          handleType,
          prevState[handleType] - this.props.step
        )
      }))

    } else if (kc === keycode('right')) {

      this.setState(prevState => ({
        [handleType]: this.constrainValue(
          handleType,
          prevState[handleType] + this.props.step
        )
      }))

    }

  }

  handleKeyUp(e) {

    const kc = e.keyCode

    if (![keycode('left'), keycode('right')].includes(kc)) {

      return

    }

    const handleType = e.currentTarget.dataset.handleType

    if (this.state[handleType] !== this.startKeyValue) {

      this.startKeyValue = null
      this.props.onChange(this.getData())

    }

  }

  handleClick(e) {

    const position = e.pageX - this.spacing.left
    const value = this.positionToValue(position)
    let update = null

    if (this.props.isRange) {

      const maxDistance = Math.abs(value - this.state.maxValue)
      const minDistance = Math.abs(value - this.state.minValue)

      if (maxDistance <= minDistance && maxDistance !== 0) {

        update = {
          maxValue: this.constrainValue('maxValue', value)
        }

      } else if (maxDistance > minDistance && minDistance !== 0) {

        update = {
          minValue: this.constrainValue('minValue', value)
        }

      }

    } else if (value !== this.state.value) {

      update = {
        value: this.constrainValue('value', value)
      }

    }

    if (update) {

      this.setState(update, () => {

        this.props.onChange(this.getData())

      })

    }


  }

  calculateLayout() {

    const stepCount = (this.props.max - this.props.min) / this.props.step
    this.spacing = this.el.getBoundingClientRect()
    this.stepPixelDistance = this.spacing.width / stepCount
    this.hasCalculatedLayout = true

  }

  constrainValue(handleType, value) {

    let min
    let max

    if (handleType === 'minValue') {

      min = this.props.min
      max = this.state.maxValue

    } else if (handleType === 'maxValue') {

      min = this.state.minValue
      max = this.props.max

    } else {

      min = this.props.min
      max = this.props.max

    }

    if (value > max) {

      return max

    }

    if (value < min) {

      return min

    }

    return value

  }

  positionToValue(position) {

    const currentStep = Math.round(position / this.stepPixelDistance)
    const normValue = currentStep * this.props.step
    const value = normValue + this.props.min

    return value

  }

  valueToPosition(value) {

    if (!this.stepPixelDistance) {

      return 0

    }

    const normValue = value - this.props.min
    const currentStep = Math.round(normValue / this.props.step)
    const position = currentStep * this.stepPixelDistance

    return position

  }

  renderMaxHandle() {

    const { isRange, showLabel } = this.props
    const valueType = this.props.isRange ? 'minValue' : 'value'

    if (!isRange) {

      return null

    }

    return [
      <div
        key='hack'
        style={{
          left: this.valueToPosition(this.state[valueType]),
          right: this.spacing.width - this.valueToPosition(this.state.maxValue)
        }}
        className={css(styles.range)}
      />,
      <SliderHandle
        key='maxValue'
        type='maxValue'
        showLabel={showLabel}
        labelMessage={String(this.state.maxValue)}
        offsetLeft={this.valueToPosition(this.state.maxValue)}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onDrag={this.handleDrag}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      />
    ]

  }

  renderHandles() {

    const { showLabel } = this.props
    const valueType = this.props.isRange ? 'minValue' : 'value'

    if (!this.hasCalculatedLayout) {

      return null

    }

    return [
      <SliderHandle
        key={valueType}
        type={valueType}
        showLabel={showLabel}
        labelMessage={String(this.state[valueType])}
        offsetLeft={this.valueToPosition(this.state[valueType])}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        onDrag={this.handleDrag}
        onDragStart={this.handleDragStart}
        onDragEnd={this.handleDragEnd}
      />,
      this.renderMaxHandle()
    ]

  }


  render() {

    return (
      <div
        {...this.ref('el')}
        onClick={this.handleClick}
        className={css(styles.container, styles.corner)}
      >
        {this.renderHandles()}
      </div>
    )

  }

}

Slider.propTypes = {
  isRange: PropTypes.bool,
  showLabel: PropTypes.bool, // TODO make showingLabel customizable
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  value: PropTypes.number,
  minValue: PropTypes.number,
  maxValue: PropTypes.number,
  onChange: PropTypes.func
}

Slider.defaultProps = {
  isRange: false,
  showLabel: false,
  step: 1,
  min: 0,
  max: 100,
  value: 0,
  minValue: 0,
  maxValue: 100,
  onChange: fp.noop
}

export default BaseReact(Slider)
