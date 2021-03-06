import React, { PropTypes } from 'react'

import styles from 'components/tabs/button.styles'
import { css } from 'utils/styles'

export default function TabButton(props) {

  const { children, isSelected, isDisabled, onClick, tabId } = props

  return (
    <div
      data-tab-id={tabId}
      onClick={onClick}
      className={css(
        styles.tabButton,
        isSelected && styles.tabButtonSelected,
        isDisabled && styles.disabled
      )}
    >
      {children}
    </div>
  )

}

TabButton.propTypes = {

  /**
   * Determines whether the tab is selected
   */
  isSelected: PropTypes.bool,

  /**
   * Determines whether the tab is disabled
   */
  isDisabled: PropTypes.bool,

  /**
   * The tab id.
   */
  tabId: PropTypes.string,

  onClick: PropTypes.func
}
