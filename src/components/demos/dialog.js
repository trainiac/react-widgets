import React from 'react'
import autobind from 'autobind-decorator'

import { Dialog } from 'components/dialog'
import styles from 'components/demos/dialog.styles'
import { css } from 'utils/styles'

class DialogDemo extends React.PureComponent {

  constructor(props) {

    super(props)
    this.state = {
      basicDialogIsOpen: false
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

  render() {

    return (
      <div>
        <button
          className={css(styles.btn)}
          onClick={this.handleOpenClick}
        >
          Open
        </button>
        <Dialog isOpen={this.state.basicDialogIsOpen}>
          <button onClick={this.handleCloseClick}>Close</button>
        </Dialog>
      </div>
    )

  }

}

export default DialogDemo
