import React from 'react'
import autobind from 'autobind-decorator'

import { Dialog, AlertDialog, ConfirmDialog } from 'components/dialog'
import styles from 'components/demos/dialog.styles'
import { css } from 'utils/styles'

class DialogDemo extends React.PureComponent {

  constructor(props) {

    super(props)
    this.state = {
      basicDialogIsOpen: false,
      alertDialogIsOpen: false,
      confirmDialogIsOpen: false
    }

  }

  @autobind
  handleOpenClick() {

    this.setState({ basicDialogIsOpen: true })

  }

  @autobind
  handleCloseClick() {

    this.setState({ basicDialogIsOpen: false })

  }


  @autobind
  handleOpenAlertClick() {

    this.setState({ alertDialogIsOpen: true })

  }

  @autobind
  handleConfirmAlertClick() {

    this.setState({ alertDialogIsOpen: false })

  }

  @autobind
  handleOpenConfirmClick() {

    this.setState({ confirmDialogIsOpen: true })

  }

  @autobind
  handleConfirmConfirmClick() {

    this.setState({ confirmDialogIsOpen: false })

  }

  @autobind
  handleCancelConfirmClick() {

    this.setState({ confirmDialogIsOpen: false })

  }

  render() {

    return (
      <div>
        <button
          className={css(styles.btn)}
          onClick={this.handleOpenClick}
        >
          Open
        </button>
        <Dialog
          isOpen={this.state.basicDialogIsOpen}
          onRequestClose={this.handleCloseClick}
        >
          <button onClick={this.handleCloseClick}>Close</button>
        </Dialog>


        <button
          className={css(styles.btn)}
          onClick={this.handleOpenAlertClick}
        >
          Open Alert
        </button>
        <AlertDialog
          isOpen={this.state.alertDialogIsOpen}
          onRequestClose={this.handleConfirmAlertClick}
          onConfirm={this.handleConfirmAlertClick}
        >
          <div> You are a penguin </div>
        </AlertDialog>


        <button
          className={css(styles.btn)}
          onClick={this.handleOpenConfirmClick}
        >
          Open Confirm
        </button>
        <ConfirmDialog
          isOpen={this.state.confirmDialogIsOpen}
          onConfirm={this.handleConfirmConfirmClick}
          onCancel={this.handleCancelConfirmClick}
          onRequestClose={this.handleCancelConfirmClick}
        >
          <div> Are you ready to rock </div>
        </ConfirmDialog>
      </div>
    )

  }

}

export default DialogDemo
