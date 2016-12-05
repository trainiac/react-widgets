import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import ComponentDemo from 'components/demos'

export default function Routes() {

  return (
    <Router history={browserHistory}>
      <Route path='/component/:componentId' component={ComponentDemo}/>
    </Router>
  )

}
