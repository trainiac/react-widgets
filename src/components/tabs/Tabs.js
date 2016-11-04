import React, { PureComponent, cloneElement, PropTypes } from 'react'
import _ from 'lodash/fp'
import styles from './Tabs.styles'
import TabButton from './TabButton'
import { isTypeComponent } from '../../utils/index'


const findTabComponents = _.filter(isTypeComponent('Tab'))

const toTabComponentArray = children =>
  findTabComponents(React.Children.toArray(children))

const getFirstTab = _.flow(
  toTabComponentArray,
  _.head
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


    return _.transform((next, tab) => {

      next.buttons.push(self.mapTabToTabButton(tab))
      next.panes.push(self.assignTabProps(tab))

      return next

    })({ buttons: [], panes: [] })(tabComponents)

  }

  renderTabs(childComponents) {

    return (
      <div {...styles.tabs()}>
        <div {...styles.tabButtons()}>
          {childComponents.buttons}
        </div>
        <div {...styles.tabPanes()}>
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
   * Should be used to pass `Tab` components.
   */
  children: PropTypes.node,

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
