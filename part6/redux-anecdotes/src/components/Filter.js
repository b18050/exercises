import React from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { connect } from 'react-redux'
import { filterAnecdote } from './../reducers/filterReducer'

const Filter = (props) => {

  // const filter = useSelector(state => state.filter)
  
  // const dispatch = useDispatch()

  const handleChange = (event) => {
    event.preventDefault()
    const msg = event.target.value
    console.log(msg)
    props.filterAnecdote(msg)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} filterAnecdote = {props.filterAnecdote} />
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    filter : state.filter
  }
}

const mapDispatchToProps = {  
  filterAnecdote
}

const ConnectedFilter = connect(
mapStateToProps,
mapDispatchToProps
)(Filter)

export default ConnectedFilter