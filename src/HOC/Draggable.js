import React from 'react'
import autobind from 'autobind-decorator'

const DraggableHOC = callbacks => WrappedComponent =>

  class Draggable extends React.PureComponent {

    constructor(props) {

      super(props)
      this.callbacks = callbacks(props)
      this.state = {
        isDragging: false
      }

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

    @autobind
    handleMouseDown(e) {

      // only left mouse button
      if (e.button !== 0) return

      this.setState({
        isDragging: true
      })
      this.draggedEl = e.currentTarget
      this.draggedEl.focus()
      this.callbacks.onDragStart(e, this.draggedEl)
      e.stopPropagation()
      e.preventDefault()

    }

    @autobind
    handleMouseUp(e) {

      this.setState({ isDragging: false })
      this.callbacks.onDragEnd(e, this.draggedEl)
      this.draggedEl = null
      e.stopPropagation()
      e.preventDefault()

    }

    @autobind
    handleMouseMove(e) {

      if (!this.state.isDragging) return
      this.callbacks.onDrag(e, this.draggedEl)
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


export default DraggableHOC
