import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { giveVote } from './../reducers/anecdoteReducer'
import { hideNotification, setNotification} from './../reducers/notificationReducer'

const Anecdote = (props) => {

    // const dispatch = useDispatch()

    const handler = () => {
        props.handleClick()
        const note = `You voted "` + props.anecdote.content + `"`
        props.setNotification(note)
        setTimeout(() => props.hideNotification(), 5000)
    }

    return (
        <div key={props.anecdote.id}>
          <div>
            {props.anecdote.content}
          </div>
          <div>
            has {props.anecdote.votes}
            <button onClick={ handler }>vote</button>
          </div>
        </div>
    )
}
const AnecdoteList = (props) => {

    // const anecdotes = useSelector(state => state.anecdotes)
    // const filterName = useSelector(state => state.filter)
    // const dispatch = useDispatch()

    // const AnecdotesToShow = () => {
    //   return props.anecdotes
    // }

    // const FilterName = () => {
    //     return props.filter
    // }

    return (
        <ul>
            {props.anecdotes.filter( a => a.content.toUpperCase().indexOf(props.filter.toUpperCase()) > -1 )
                      .sort((a1,a2) => a2.votes - a1.votes )
                      .map( anecdote =>
                        < Anecdote 
                            setNotification = {props.setNotification}
                            hideNotification = {props.hideNotification}
                            key = {anecdote.id} 
                            anecdote = {anecdote} 
                            handleClick = {() => props.giveVote(anecdote.id) }
                        />
                    )}
        </ul>
    )

}

const mapStateToProps = (state) => {
  return {
    anecdotes : state.anecdotes,
    filter : state.filter
  }
}


const mapDispatchToProps = {  
      giveVote,
      hideNotification,
      setNotification
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AnecdoteList)

export default ConnectedAnecdoteList
