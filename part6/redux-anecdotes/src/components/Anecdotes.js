import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notify_vote } from '../reducers/notificationReducer'

const Anecdotes = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id))
        const message = anecdotes.find(n => n.id === id).content
        console.log(message)
        dispatch(notify_vote(`You voted ${message}`))
        setTimeout(() => {
                dispatch(notify_vote(''))
        }, 5000)
    }
    
    return (
        <div>
            <h2>Anecdotes</h2>
            {anecdotes 
                .sort((a1,a2) => a2.votes - a1.votes)
                .map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )

}

export default Anecdotes