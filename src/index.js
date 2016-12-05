import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from 'containers/Root'

ReactDOM.render(
  <AppContainer>
    <Root/>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {

  module.hot.accept('containers/Root', () => {

    const NewRoot = require('containers/Root').default // eslint-disable-line global-require
    ReactDOM.render(
      <AppContainer>
        <NewRoot/>
      </AppContainer>,
      document.getElementById('root')
    )

  })

}
