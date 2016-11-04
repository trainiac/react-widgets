import React, { PropTypes } from 'react'
import styles from './Tab.styles'

export default function Tab(props) {

  const { children, isSelected, tabId } = props


  return (
    <div
      data-tab-id={tabId}
      {...styles.tabPane(isSelected)}
    >
      {children}
    </div>
  )

}

Tab.propTypes = {

  /**
   * Should be tab content, text and/or more components
   */
  children: PropTypes.node,

  /**
   * Determines whether the tab is selected
   */
  isSelected: PropTypes.bool,

  /**
   * The tab id.
   */
  tabId: PropTypes.string.isRequired
}
