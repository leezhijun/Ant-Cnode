import React from 'react'
import {
  render
} from 'react-dom'
import {
  Provider
} from 'react-redux'

import Routes from './Config/Routes'
import configureStore from './reducers/configureStore'

const store = configureStore()

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
