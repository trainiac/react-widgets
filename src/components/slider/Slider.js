import React, { PropTypes } from 'react'
import fp from 'lodash/fp'
import round from 'lodash/round'
import invariant from 'invariant'
import keycode from 'keycode'
import autobind from 'autobind-decorator'

import { css } from 'utils/styles'
import SliderHandle from 'components/slider/SliderHandle'
import styles from 'components/slider/Slider.styles'

/*
  clean up code where possible
  clean up demo code

  should accept a labelComponent that will receive
    isDragging
    value
*/

const precision = 6
const getPercentage = number => round(number, precision) * 100

class Slider extends React.PureComponent {

  static propTypes = {
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

  static defaultProps = {
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
    this.stepPercentage = getPercentage(this.props.step / (this.props.max - this.props.min))

  }

  @autobind
  handleDragStart() {

    this.startDragValue = this.state.value

  }

  @autobind
  handleDrag(e, handle) {

    const handleType = handle.dataset.handleType
    const position = this.getRelativeMousePostion(e)

    let value = this.positionToValue(position)
    value = this.constrainValue(handleType, value)

    this.setState({
      [handleType]: value
    })

  }

  @autobind
  handleDragEnd(e, handle) {

    const handleType = handle.dataset.handleType
    if (this.state[handleType] !== this.startDragValue) {

      this.startDragValue = null
      this.props.onChange({
        props: { ...this.props },
        state: { ... this.state }
      })

    }

  }

  @autobind
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

  @autobind
  handleKeyUp(e) {

    const kc = e.keyCode

    if (![keycode('left'), keycode('right')].includes(kc)) {

      return

    }

    const handleType = e.currentTarget.dataset.handleType

    if (this.state[handleType] !== this.startKeyValue) {

      this.startKeyValue = null
      this.props.onChange({
        props: { ...this.props },
        state: { ... this.state }
      })

    }

  }

  @autobind
  handleClick(e) {

    const position = this.getRelativeMousePostion(e)
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

        this.props.onChange({
          props: { ...this.props },
          state: { ... this.state }
        })

      })

    }

  }

  getRelativeMousePostion(e) {

    const spacing = this.el.getBoundingClientRect()
    const position = getPercentage(
      (e.pageX - spacing.left) / spacing.width
    )

    return position

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

    const currentStep = Math.round(position / this.stepPercentage)
    const normValue = currentStep * this.props.step
    const value = normValue + this.props.min

    return value

  }

  valueToPosition(value) {

    const normValue = value - this.props.min
    const currentStep = Math.round(normValue / this.props.step)
    const position = currentStep * this.stepPercentage

    return position

  }

  render() {

    const { showLabel, isRange } = this.props
    const valueType = this.props.isRange ? 'minValue' : 'value'

    return (
      <div
        ref={el => this.el = el}
        onClick={this.handleClick}
        className={css(styles.container, styles.corner)}
      >
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
        />

        {isRange && ([
          <div
            key='hack'
            style={{
              left: `${this.valueToPosition(this.state[valueType])}%`,
              right: `${100 - this.valueToPosition(this.state.maxValue)}%`
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
        ])}

      </div>
    )

  }

}

export default Slider
