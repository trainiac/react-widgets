import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import WidgetSection from 'components/sections'
import TabsSection from 'components/sections/TabsSection'
import AccordionSection from 'components/sections/AccordionSection'
import ActionMenuSection from 'components/sections/ActionMenuSection'
import InfiniteScrollSection from 'components/sections/InfiniteScrollSection'
import SliderSection from 'components/sections/SliderSection'
import DatepickerSection from 'components/sections/DatepickerSection'

export default function Routes() {

  return (
    <Router history={browserHistory}>
      <Route path='/' component={WidgetSection}>
        {/*
          TODO figure out a more dynamic way of loading components based on URL
          and setting title within the Widget Section
        */}
        <Route path='accordion' component={AccordionSection}/>
        <Route path='action-menu' component={ActionMenuSection}/>
        <Route path='datepicker' component={DatepickerSection}/>
        <Route path='infinitescroll' component={InfiniteScrollSection}/>
        <Route path='slider' component={SliderSection}/>
        <Route path='tabs' component={TabsSection}/>
      </Route>
    </Router>
  )

}
