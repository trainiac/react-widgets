import React, { PropTypes } from 'react'
import fp from 'lodash/fp'

const DraggableHOC = mapHandlers => WrappedComponent => {

  class Draggable extends React.PureComponent {

    constructor(props) {

      super(props)
      this.handlers = mapHandlers(props)
      this.state = {
        isDragging: false
      }
      this.handleMouseDown = this.handleMouseDown.bind(this)
      this.handleMouseMove = this.handleMouseMove.bind(this)
      this.handleMouseUp = this.handleMouseUp.bind(this)

    }

    componentDidUpdate(props, state) {

      if (this.state.isDragging && !state.isDragging) {

        document.addEventListener('mousemove', this.handleMouseMove)
        document.addEventListener('mouseup', this.handleMouseUp)

      } else if (!this.state.isDragging && state.isDragging) {

        document.removeEventListener('mousemove', this.handleMouseMove)
        document.removeEventListener('mouseup', this.handleMouseUp)

      }

    }

    // calculate relative position to the mouse and set isDragging=true
    handleMouseDown(e) {

      // only left mouse button
      if (e.button !== 0) return

      this.setState({
        isDragging: true
      })
      this.draggedEl = e.currentTarget
      this.draggedEl.focus()
      this.handlers.onDragStart(e, this.draggedEl)
      e.stopPropagation()
      e.preventDefault()

    }
    handleMouseUp(e) {

      this.setState({ isDragging: false })
      this.handlers.onDragEnd(e, this.draggedEl)
      this.draggedEl = null
      e.stopPropagation()
      e.preventDefault()

    }
    handleMouseMove(e) {

      if (!this.state.isDragging) return
      this.handlers.onDrag(e, this.draggedEl)
      e.stopPropagation()
      e.preventDefault()

    }
    render() {

      const propsToTransfer = {
        draggable: {
          handleMouseDown: this.handleMouseDown
        }
      }

      return <WrappedComponent {...propsToTransfer} {...this.props}/>

    }
  }

  Draggable.defaultProps = {
      // allow the initial position to be passed in as a prop
    onDrag: fp.noop,
    onDragStart: fp.noop,
    onDragEnd: fp.noop
  }

  Draggable.propTypes = {
    onDrag: PropTypes.func,
    onDragStart: PropTypes.func,
    onDragEnd: PropTypes.func
  }

  return Draggable

}

export default DraggableHOC


