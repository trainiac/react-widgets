import React, { PropTypes } from 'react'
import keycode from 'keycode'
import autobind from 'autobind-decorator'

import { css } from 'utils/styles'
import Portal from 'HOC/Portal'
import styles from 'components/dialog/Dialog.styles'

/*
  TODO create better effect for opening and closing
       create events for before after open and close
       make dialogs prettier
       styles more configurable
       make positioning configurable
       having a closeBtn configurable
  https://gist.github.com/ryanflorence/fd7e987c832cc4efaa56
*/

@Portal(props => ({
  shouldRenderPortal: props.isOpen
}))
class Dialog extends React.PureComponent {

  constructor(props) {

    super(props)
    this.shouldClose = null

  }

  static propTypes = {
    isOpen: PropTypes.bool,
    shouldCloseOnOverlayClick: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired
  }

  static defaultProps = {
    isOpen: false,
    shouldCloseOnOverlayClick: true
  }

  @autobind
  handleKeyDown(event) {

    if (event.keyCode === keycode('esc')) {

      event.preventDefault()
      this.props.onRequestClose(event)

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

      this.props.onRequestClose(event)

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

  render() {

    return (
      (this.props.isOpen ? (
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
