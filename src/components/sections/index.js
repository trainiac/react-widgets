import React, { PropTypes } from 'react'

import styles from 'components/sections/index.styles'
import { css } from 'utils/styles'

export default function WidgetSection(props) {

  return (
    <div {...css(styles.wrapper)}>
      <h2 {...css(styles.title)}>{props.title}</h2>
      <div {...css(styles.container)}> {props.children} </div>
    </div>
  )

}

WidgetSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}
