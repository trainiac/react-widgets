import React, { PropTypes } from 'react'
import styles from './TabButton.styles'

export default function TabButton(props) {

  const { children, isSelected, isDisabled, onClick, tabId } = props

  return (
    <div
      data-tab-id={tabId}
      onClick={onClick}
      {...styles.tabButton(isSelected, isDisabled)}
    >
      {children}
    </div>
  )

}

TabButton.propTypes = {

  /**
   * Should be tab content, text and/or more components
   */
  children: PropTypes.node,

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
