import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools, combineReducers } from 'redux-devtools-extension'
import App from './App'
// import store from './store'

import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'

// import { createAnecdote } from './reducers/anecdoteReducer'
// import { notify } from './reducers/notificationReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer,
  composeWithDevTools()
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(notify())
// store.dispatch(createAnecdote('combineReducers forms one reducer from many simple reducers'))
