import {
  composeWithDevTools
} from 'redux-devtools-extension' // 调试redux
import logger from 'redux-logger' // 调试redux
import thunk from 'redux-thunk'
import {
  createStore,
  applyMiddleware
} from 'redux'
import appReducer from './index.js'
export default function configureStore () {
  let store
  if (process.env.NODE_ENV === 'development') {
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

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('./index.js')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
