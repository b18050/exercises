import React from 'react'
import  NewAnecdote  from './components/NewAnecdote'
import  Anecdotes from './components/Anecdotes'

const App = () => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdotes />
      <NewAnecdote />
      
    </div>
  )
}

export default App