import React from 'react'
import { useDispatch } from 'react-redux'
import { show_filter } from '../reducers/filterReducer'

const Filter = () => {

    const dispatch = useDispatch()

    // const anecdotes = useSelector(state => state.filter)

    const handleFilterAnecdoteChange = (event) => {
        event.preventDefault()
        const filter = event.target.value
        console.log(filter)
        dispatch(show_filter(filter))
    }

    const style = {
        marginBottom: 10
    }

  return (
    <div style={style}>
      filter <input name='filterName' onChange={handleFilterAnecdoteChange} />
    </div>
  )
}

export default Filter