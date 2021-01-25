import React, { useState } from 'react'
import {
  Button,
  TextField,
} from '@material-ui/core'

const NewBlog = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewBlog = (event) => {
    event.preventDefault()

    props.addBlog({
      title, author, url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
        <div>
          
          <TextField id="filled-basic" label="author" variant="outlined"
            onChange={({ target }) => setAuthor(target.value)} >
          </TextField>
        </div>
        <div>
         
          <TextField id="filled-basic" label="title" variant="outlined"
            onChange={({ target }) => setTitle(target.value)}
          >
          </TextField>
        </div>
        <div>
        
          <TextField id="filled-basic" label="url" variant="outlined"
            onChange={({ target }) => setUrl(target.value)}
          >

          </TextField>
        </div>
        <Button variant="contained" color="secondary">create</Button>
      </form>
    </div>
  )
}

export default NewBlog