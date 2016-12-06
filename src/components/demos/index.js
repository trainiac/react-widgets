import React from 'react'
import { Link } from 'react-router'
import fp from 'lodash/fp'

import TabsDemo from 'components/demos/tabs'
import AccordionDemo from 'components/demos/accordion'
import ActionMenuDemo from 'components/demos/actionMenu'
import DatepickerDemo from 'components/demos/datepicker'
import DialogDemo from 'components/demos/dialog'
import InfiniteScrollDemo from 'components/demos/infiniteScroll'
import SliderDemo from 'components/demos/slider'


import styles from 'components/demos/index.styles'
import { css } from 'utils/styles'


const menuLinks = [{
  text: 'Accordion',
  to: 'accordion',
  component: AccordionDemo
}, {
  text: 'Action Menu',
  to: 'actionmenu',
  component: ActionMenuDemo
}, {
  text: 'Datepicker',
  to: 'datepicker',
  component: DatepickerDemo
}, {
  text: 'Dialog',
  to: 'Dialog',
  component: DialogDemo
}, {
  text: 'Inifinite Scroll',
  to: 'infinitescroll',
  component: InfiniteScrollDemo
}, {
  text: 'Slider',
  to: 'slider',
  component: SliderDemo
}, {
  text: 'Tabs',
  to: 'tabs',
  component: TabsDemo
}]

const menuLinkMap = fp.keyBy('to', menuLinks)

export default function ComponentDemo(props) {

  const { componentId } = props.params
  const menuLink = menuLinkMap[componentId]

  return (
    <div className={css(styles.wrapper)}>
      <div className={css(styles.menu)}>
        <div className={css(styles.menuLinks)}>
          {menuLinks.map(menuLink =>
            <Link
              key={menuLink.to}
              to={`/component/${menuLink.to}`}
              className={css(styles.menuLink)}
              activeClassName={css(styles.menuLinkSelected)}
            >
              {menuLink.text}
            </Link>)}
        </div>
      </div>
      <div className={css(styles.clearfix)}>
        <h2 className={css(styles.title)}>{menuLink.text}</h2>
      </div>
      <div className={css(styles.container)}>
        <menuLink.component {...props}/>
      </div>
    </div>
  )

}
