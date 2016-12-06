import React, { PropTypes } from 'react'
import keycode from 'keycode'
import autobind from 'autobind-decorator'

import { css } from 'utils/styles'
import Portal from 'HOC/Portal'
import styles from 'components/dialog/Dialog.styles'

@Portal
class Dialog extends React.PureComponent {

  static propTypes = {
    isOpen: PropTypes.bool,
    shouldCloseOnOverlayClick: PropTypes.bool,
    onRequestClose: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
    shouldCloseOnOverlayClick: true
  }

  constructor(props) {

    super(props)

    this.state = {
      isOpen: props.isOpen
    }

  }

  componentDidMount() {

    /* if (this.props.isOpen) {
      this.open()
    }*/
  }

  componentWillReceiveProps(newProps) {

    if (!this.state.isOpen && newProps.isOpen) {

      this.setState({ isOpen: true })

    } else if (this.state.isOpen && !newProps.isOpen) {

      this.setState({ isOpen: false })

    }

  }

  @autobind
  handleKeyDown(event) {

    if (event.keyCode === keycode('esc')) {

      event.preventDefault()
      this.requestClose(event)

    }

  }

  @autobind
  handleOverlayMouseDown() {

    if (this.shouldClose === null) {

      this.shouldClose = true

    }

  }

  @autobind
  handleOverlayMouseUp(event) {

    if (this.shouldClose && this.props.shouldCloseOnOverlayClick) {

      this.requestClose(event)

    }

    this.shouldClose = null

  }

  @autobind
  handleContentMouseDown() {

    this.shouldClose = false

  }

  @autobind
  handleContentMouseUp() {

    this.shouldClose = false

  }

  requestClose(event) {

    if (this.props.onRequestClose) {

      this.props.onRequestClose(event)

    } else {

      this.setState({ isOpen: false })

    }

  }

  render() {

    return (
      (this.state.isOpen ? (
        <div
          className={css(styles.overlay)}
          onMouseDown={this.handleOverlayMouseDown}
          onMouseUp={this.handleOverlayMouseUp}
        >
          <div
            className={css(styles.content)}
            onKeyDown={this.handleKeyDown}
            onMouseDown={this.handleContentMouseDown}
            onMouseUp={this.handleContentMouseUp}
          >
            {this.props.children}
          </div>
        </div>
      ) : null)
    )

  }

 }


export default Dialog
