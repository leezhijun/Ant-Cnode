import React from 'react'
import {
  render
} from 'react-dom'
import {
  Provider
} from 'react-redux'
import {
  composeWithDevTools
} from 'redux-devtools-extension' // 调试redux
import logger from 'redux-logger' // 调试redux
import thunk from 'redux-thunk'
import {
  createStore,
  applyMiddleware
} from 'redux'
import appReducer from './reducers'
import Routes from './Config/Routes'
const __isDev__ = process.env.NODE_ENV === 'development'
let store

if (__isDev__) {
  store = createStore(
    appReducer,
    composeWithDevTools(
      applyMiddleware(logger, thunk)
    )
  )
} else {
  store = createStore(
    appReducer,
    applyMiddleware(thunk)
  )
}

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
