import React from 'react'
import { useSelector } from 'react-redux'

const Filter = () => {
    const anecdotes = useSelector(state => state.filter)
    const handleFilterAnecdoteChange = (event) => {
        const filter = event.target.value
        console.log(filter)
        return {}

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