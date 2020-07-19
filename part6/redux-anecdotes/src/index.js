import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'



// import { createAnecdote } from './reducers/anecdoteReducer'
// import { notify } from './reducers/notificationReducer'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// store.subscribe(() => console.log(store.getState()))
// store.dispatch(notify())
// store.dispatch(createAnecdote('combineReducers forms one reducer from many simple reducers'))
