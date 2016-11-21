import React, { PropTypes } from 'react'
import styles from './WidgetSection.styles'

export default function WidgetSection(props) {

  return (
    <div {...styles.wrapper()}>
      <h2 {...styles.title()}>{props.title}</h2>
      <div {...styles.container()}> {props.children} </div>
    </div>
  )

}

WidgetSection.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string
}
