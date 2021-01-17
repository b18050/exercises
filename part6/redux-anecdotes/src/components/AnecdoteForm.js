import React from 'react'
// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from './../reducers/anecdoteReducer'
import { hideNotification, setNotification} from './../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    // const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        props.createAnecdote(content)

        // const note = `You created "` + content + `"`
        // dispatch(setNotification(note))
        // setTimeout(() => dispatch(hideNotification()), 5000)

        props.setNotification(`you voted '${content}'`, 3)
    }
    
    return(
        
        <form onSubmit = {addAnecdote}>
          <div><input name = "anecdote" /></div>
          <button>create</button>
        </form>
    )
}

const mapStateToProps = (state) => {
  return {
    anecdotes : state.anecdotes,
    filter : state.filter
  }
}

  
  const mapDispatchToProps = {  
        createAnecdote,
        hideNotification,
        setNotification
  }
  
  const ConnectedAnecdoteForm = connect(
    null,
    mapDispatchToProps
    )(AnecdoteForm)
  
export default ConnectedAnecdoteForm


