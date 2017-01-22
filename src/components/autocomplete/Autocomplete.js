import React, { PropTypes } from 'react'
import keycode from 'keycode'
import autobind from 'autobind-decorator'
import fp from 'lodash/fp'

import { css } from 'utils/styles'
import { filterCap } from 'utils/array'
import styles from 'components/dialog/Autocomplete.styles'
import AutocompleteMenu from 'components/autocomplete/AutocompleteMenu'

/*
  TODO

  autocomplete menu should match size of input
  autocomplete should reposition if size of input changes
  autocomplete can be enabled disabled
  autocomplete can do nothing or set the input on select
*/


const menuNavigationKeys = [
  keycode('down'),
  keycode('up'),
  keycode('enter'),
  keycode('escape')
]


export default class Autocomplete extends React.PureComponent {

  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    minLength: PropTypes.number,
    delay: PropTypes.number,
    maxResults: PropTypes.number,
    onRequestSearch: PropTypes.func,
    onSelect: PropTypes.func
    // enabled: PropTypes.bool,
    // setInputOnSelect: PropTypes.bool
  }

  static defaultProps = {
    results: [],
    value: '',
    minLength: 2,
    delay: 200,
    maxResults: 50
    // enabled: true,
    // setInputOnSelect: true
  }

  constructor(props) {

    super(props)

    this.state = {
      value: props.value,
      results: props.results,
      isRequestingMenu: false,
      selectedIndex: null,
      resultIndex: 0
    }

    if (this.props.onRequestSearch) {

      this.requestSearch = this.getRequestSearch(props)

    }

  }

  componentWillReceiveProps(newProps) {

    // purposefully do not update when value is passed in again.
    // this is to allow an initial value to be passed in and then
    // leave control of the value to the component

    this.setState((state, props) => ({
      results: this.filterResults(props, state.value)
    }))

    if (
      (newProps.delay !== this.props.delay) ||
      (newProps.onRequestSearch !== newProps.onRequestSearch)
    ) {

      this.requestSearch = this.getRequestSearch(newProps)

    }


  }

  @autobind
  handleInput(e) {

    const value = e.currentTarget.value

    if (this.isValueMinLength(this.props, value)) {

      if (this.props.onRequestSearch) {

        this.setState({
          value,
          isRequestingMenu: true
        })
        this.requestSearch(value)

      } else {

        this.setState((state, props) => ({
          value,
          isRequestingMenu: true,
          results: this.filterResults(props, value)
        }))

      }

    }

  }


  @autobind
  handleSelect(e) {

    const value = e.currentTarget.dataset.value
    this.setState({
      value,
      isRequestingMenu: false
    }, (state, props) => props.onSelect({
      state: { ...state },
      props: { ...props }
    }))

  }

  @autobind
  handleKeyup(e) {

    if (menuNavigationKeys.contains(e.keyCode)) {

      e.preventDefault()

    }

  }

  @autobind
  handleKeydown(e) {

    if (this.isMenuOpen(this.state)) {

      switch (e.keyCode) {
        case keycode('up'):
          this.setState(state => {

            if (state.resultIndex === 0) {

              return {
                resultIndex: state.resultIndex
              }

            }

            return {
              resultIndex: state.resultIndex - 1
            }

          })
          break
        case keycode('down'):
          this.setState(state => {

            if (state.resultIndex === state.results.length - 1) {

              return {
                resultIndex: state.resultIndex
              }

            }

            return {
              resultIndex: state.resultIndex + 1
            }

          })
          break
        case keycode('enter'):
          this.setState(state => ({
            selectedIndex: state.resultIndex
          }))
          break
        case keycode('esc'):
          this.closeMenu()
          break
        default:
          return
      }

    }

  }

  @autobind
  handleBlur() {

    // if the activeElement is or contained by the menu return
    this.closeMenu()


  }

  closeMenu() {

    this.setState({
      isRequestingMenu: false,
      resultIndex: 0,
      selectedIndex: null
    })

  }

  isMenuOpen(state) {

    return state.isRequestingMenu && state.results.length > 0

  }

  getRequestSearch(props) {

    return fp.debounce(
      props.delay,
      props.onRequestSearch
    )

  }

  isValueMinLength(props, value) {

    return value.length > props.minLength

  }

  filterResults(props, value) {

    if (this.isValueMinLength(props, value)) {

      return []

    }

    const lowerValue = value.toLowerCase()
    return filterCap(
      props.maxResults,
      result => lowerValue.contains(result.toLowerCase()),
      props.results
    )

  }

  render() {

    return ([
      <input
        key='autocompleteInput'
        type='input'
        autoComplete='off'
        className={css(styles.input)}
        onInput={this.handleInput}
        onKeyup={this.handleKeyup}
        onKeydown={this.handleKeydown}
        onBlur={this.handleBlur}
      />,
      <AutocompleteMenu
        key='autocompletMenu'
        index={this.state.resultIndex}
        selected={this.state.selectedIndex}
        isOpen={this.isMenuOpen(this.state)}
        results={this.state.results}
        onSelect={this.handleSelect}
      />
    ])

  }

}
