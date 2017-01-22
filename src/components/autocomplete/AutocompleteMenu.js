import React, { PropTypes } from 'react'
import autobind from 'autobind-decorator'
import fp from 'lodash/fp'

import { css } from 'utils/styles'
import styles from 'components/dialog/AutocompleteMenu.styles'

/*
  TODO

  autocomplete menu should match size of input
  autocomplete should reposition if size of input changes
  autocomplete can be enabled disabled
  autocomplete can do nothing or set the input on select
*/

export default class Autocomplete extends React.PureComponent {

  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.string),
    index: PropTypes.string,
    selected: PropTypes.string,
    onSelect: PropTypes.func,
    isOpen: PropTypes.bool
  }

  static defaultProps = {
    isOpen: false,
    index: -1,
    results: []
  }

  isCurrent(index){
    return this.props.index === index
  }

  isSelected(index){
    return this.props.selected === index
  }

  @autobind
  handleMouseLeave(){
    this.setState({
      index: -1
    })
  }

  @autobind
  handleMouseEnter(e){
    const results = document.querySelectorAll('[menu-option]')
    const result = maybeTarget(e.target, '[menu-option]')
    if(result){
      this.setState({
        index: elementIndex(results, result)
      })
    }
  }

  @autobind
  handleClick(e){
    const result = DOM.maybeTarget(e.target, '[menu-option]')
    if(result){
      this.setState({
        selected: DOM.elementIndex(e.currentTarget, '[menu-option]' result)
      })
    }
  }

  render() {

    return (this.props.isOpen ? ({
        <ul
          className={css(styles.results)}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onFocusin={this.handleFocusin}
        >
          {this.props.results.map((result, index) => {
            <li
              className={css(
                styles.result,
                this.isCurrent(index) && styles.resultCurrent
                this.isSelected(index) && styles.resultSelected
                this.isDisabled
              )}
            >
              <a menu-option href="#" data-value={result}>
                {result}
              </a>
            </li>
          })}
        </ul>
      ))

  }

}
