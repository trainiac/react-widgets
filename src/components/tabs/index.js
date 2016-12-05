import React, { PureComponent, cloneElement, PropTypes } from 'react'
import fp from 'lodash/fp'

import TabButton from 'components/tabs/button'
import { isTypeComponent } from 'utils/react'
import styles from 'components/tabs/index.styles'
import { css } from 'utils/styles'


const findTabComponents = fp.filter(isTypeComponent('Tab'))

const toTabComponentArray = children =>
  findTabComponents(React.Children.toArray(children))

const getFirstTab = fp.flow(
  toTabComponentArray,
  fp.head
)

export default class Tabs extends PureComponent {

  constructor(props) {

    super(props)
    this.state = {
      selectedId: props.selectedId ? props.selectedId : getFirstTab(props.children).props.tabId
    }

  }

  componentWillUpdate(nextProps, nextState) {

    if (nextState.selectedId !== this.state.selectedId) {

      this.props.tabWillClose(this.state.selectedId)
      this.props.tabWillOpen(nextState.selectedId)

    }

  }

  componentDidUpdate(prevProps, prevState) {

    if (prevState.selectedId !== this.state.selectedId) {

      this.props.tabDidClose(prevState.selectedId)
      this.props.tabDidOpen(this.state.selectedId)

    }

  }

  render() {

    const tabComponents = toTabComponentArray(this.props.children)
    const childComponents = this.buildChildComponents(tabComponents)


    return this.renderTabs(childComponents, styles)

  }

  mapTabToTabButton(tab) {

    const self = this
    const isSelected = self.isTabSelected(tab)
    const { isDisabled, tabId, buttonText } = tab.props
    const tabButtonAttrs = {
      isSelected,
      isDisabled,
      tabId,
      key: tabId,
      onClick: () => !isDisabled && self.setState({ selectedId: tabId })
    }

    return (
      <TabButton {...tabButtonAttrs}>
        {buttonText}
      </TabButton>
    )

  }

  assignTabProps(tab) {

    const self = this


    return cloneElement(
      tab, {
        isSelected: self.isTabSelected(tab),
        key: tab.props.tabId
      }
    )

  }

  buildChildComponents(tabComponents) {

    const self = this


    return fp.transform((next, tab) => {

      next.buttons.push(self.mapTabToTabButton(tab))
      next.panes.push(self.assignTabProps(tab))

      return next

    })({ buttons: [], panes: [] })(tabComponents)

  }

  renderTabs(childComponents) {

    return (
      <div className={css(styles.tabs)}>
        <div className={css(styles.tabButtons, styles.clearfix)}>
          {childComponents.buttons}
        </div>
        <div className={css(styles.tabPanes)}>
          {childComponents.panes}
        </div>
      </div>
    )

  }

  isTabSelected(tab) {

    return tab.props.tabId === this.state.selectedId

  }
}


Tabs.propTypes = {

  /**
   * Callback called after a tab is closed
   */
  tabDidClose: PropTypes.func,

  /**
   * Callback for when tab is about to close
   */
  tabWillClose: PropTypes.func,

  /**
   * Callback for after a tab has opened
   */
  tabDidOpen: PropTypes.func,

  /**
   * Callback for when tab is about to open
   */
  tabWillOpen: PropTypes.func,

  /**
   * The ID of the tab that is selected.
   */
  selectedId: PropTypes.string
}
