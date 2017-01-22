import React, { PropTypes } from 'react'
import autobind from 'autobind-decorator'
import fp from 'lodash/fp'

import Dialog from 'components/dialog/Dialog'

class AlertDialog extends React.PureComponent {

  static propTypes = {
    onConfirm: PropTypes.func
  }

  static defaultProps = {
    onConfirm: fp.noop
  }

  @autobind
  handleConfirm() {

    this.props.onConfirm()

  }

  render() {

    const { onConfirm, ...props } = this.props

    return (
      <Dialog {...props}>
        {this.props.children}
        <button onClick={onConfirm}>
          OK
        </button>
      </Dialog>
    )

  }

 }


export default AlertDialog
