import React, { PropTypes } from 'react'
import autobind from 'autobind-decorator'
import fp from 'lodash/fp'

import Dialog from 'components/dialog/Dialog'

class ConfirmDialog extends React.PureComponent {

  static propTypes = {
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
  }

  static defaultProps = {
    onConfirm: fp.noop,
    onCancel: fp.noop
  }

  @autobind
  handleConfirm() {

    this.props.onConfirm()

  }

  @autobind
  handleCancel() {

    this.props.onCancel()

  }

  render() {

    const { onConfirm, onCancel, ...props } = this.props

    return (
      <Dialog {...props}>
        {this.props.children}
        <button onClick={onConfirm}>
          OK
        </button>
        <button onClick={onCancel}>
          Cancel
        </button>
      </Dialog>
    )

  }

 }


export default ConfirmDialog
