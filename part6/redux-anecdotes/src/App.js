import React from 'react'
import  NewAnecdote  from './components/NewAnecdote'
import  Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Fiter'

const App = () => {
  return (
    <div>

      <Notification />
      <br></br>
      <Filter />
      <Anecdotes />
      <NewAnecdote />
      
    </div>
  )
}

export default App