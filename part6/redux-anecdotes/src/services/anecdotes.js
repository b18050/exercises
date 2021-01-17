import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}/`)
  return response.data
}

const createNew = async (content) => {  
  const id = getId()
  const object = { content, id:id, votes: 0 }   
    const response = await axios.post(baseUrl, object)  
    return response.data
}

const giveVote = async (id) => { 
  const anecdote = await getOne(id)
  const newAnecdote = {
    ...anecdote,
    votes : anecdote.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}/`, newAnecdote)
  console.log(response.data)
  return response.data
}

export default { getAll , createNew, giveVote }