import React, { PureComponent, PropTypes } from 'react'
import $ from 'jquery'
import fp from 'lodash/fp'

import styles from 'components/accordion/key.styles'
import { css } from 'utils/styles'
import { ref } from 'utils/react'

export default class AccordionKey extends PureComponent {

  constructor(props) {

    super(props)
    this.state = {
      isOpening: false
    }

    this.handleHeaderClick = this.handleHeaderClick.bind(this)
    this.handleSectionTransitionEnd = this.handleSectionTransitionEnd.bind(this)

  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.isOpen && !this.props.isOpen) {

      this.setState({
        isOpening: true
      })

    }

  }

  handleHeaderClick() {

    const { isDisabled, isOpen, keyId, onHeaderClick } = this.props

    if (isDisabled) {

      return

    }

    onHeaderClick(
      keyId,
      isOpen
    )

  }

  getSectionStyles() {

    return {
      height: this.getSectionHeight(),
      overflowY: this.getSectionOverflowY()
    }

  }

  getSectionHeight() {

    let height = 0

    if (this.props.isOpen) {

      if (this.props.height) {

        height = this.props.height

      } else {

        const $section = $(this.section)
        const $clone = $section.clone()

        $section.after($clone)
        height = $clone
                   .css('height', 'auto')
                   .height()
        $clone.remove()

      }

    }

    return height

  }

  getSectionOverflowY() {

    let overflowY = 'hidden'

    if (this.props.isOpen && !this.state.isOpening) {

      overflowY = 'auto'

    }

    return overflowY

  }

  handleSectionTransitionEnd() {

    this.setState({ isOpening: false })

  }

  render() {

    const { children, isOpen, isDisabled, keyText } = this.props


    return (
      <div {...css(styles.key, isOpen && styles.keyOpen)}>
        <header {...css(styles.keyHeader)}>
          <h3
            onClick={this.handleHeaderClick}
            {...css(
              styles.keyHeaderTitle,
              isOpen && styles.keyHeaderTitleOpen,
              isDisabled && styles.disabled
            )}
          >
            <a {...css(styles.keyHeaderButton)}>
              {keyText}
            </a>
          </h3>
        </header>
        <section
          {...css(styles.keyContent)}
          {...ref(this, 'section')}
          style={this.getSectionStyles()}
          onTransitionEnd={this.handleSectionTransitionEnd}
        >
          {children}
        </section>
      </div>

    )

  }
}

AccordionKey.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  keyId: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onHeaderClick: PropTypes.func,
  keyText: PropTypes.string.isRequired,
  height: PropTypes.number
}

AccordionKey.defaultProps = {
  isOpen: false,
  isDisabled: false,
  onHeaderClick: fp.noop,
  height: 0
}
