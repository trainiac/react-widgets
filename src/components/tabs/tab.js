import React, { PropTypes } from 'react'
import styles from 'components/tabs/tab.styles'
import { css } from 'utils/styles'

export default function Tab(props) {

  const { children, isSelected, tabId } = props


  return (
    <div
      data-tab-id={tabId}
      className={css(styles.tabPane, isSelected && styles.tabPaneSelected)}
    >
      {children}
    </div>
  )

}

Tab.propTypes = {

  /**
   * Determines whether the tab is selected
   */
  isSelected: PropTypes.bool,

  /**
   * The tab id.
   */
  tabId: PropTypes.string.isRequired
}
