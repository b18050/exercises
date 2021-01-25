import React, { useState } from 'react'
import {
  useParams
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {addComment} from './../reducers/blogReducer'
import PropTypes from 'prop-types'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Button,
  TextField,
  AppBar,
  Toolbar,
  IconButton,
} from '@material-ui/core'

const Comments = ({blog, handleComment}) => {

  console.log(blog)

  const [comment,setComment] = useState('')

  const handleSubmit = ( event ) => {
    event.preventDefault()
    if(!comment) return
    const id = blog.id
    handleComment({comment,id})
    setComment('')

  }
  
  return(
    <div>
      <br></br>
      <br></br>
      <form onSubmit={handleSubmit}>
      
      <div>
        <TextField label="comment"  variant="outlined"
          onChange={({ target }) => setComment(target.value)}
        >

        </TextField>
      </div>
      <Button variant="contained" color="primary"> Add Comment</Button>
      </form>
      <h3> Comments</h3>
      <div>
        <ul>
        {blog.comments && blog.comments.map((comment,idx) => <li key={idx} >{comment}</li>)}
        </ul>
      </div>
      
    </div>
  )
}
const Blog = ({ blogs, handleLike, handleRemove, own }) => {

  const dispatch = useDispatch()
  
  const id = useParams().id  
  const blog = blogs.find(b => b.id === id)
  
  if(!blog) return null

  const handleComment = ({comment,id}) => {
    console.log(comment)
    console.log(id)
    dispatch(addComment({comment,id}))
  }
  return (
    <div >
        
        <h2>{blog.title}</h2> 
        <div>
          {<div>
            <div>likes {blog.likes}</div>
            <Button variant="contained" color="secondary" onClick={() => handleLike(blog.id)}>like</Button>
          </div>}
          <a href={blog.url}>{blog.url}</a>
          <div>added by {blog.user.name}</div>
        </div>
          {own && <Button 
              color="secondary" onClick={() => handleRemove(blog.id)}>remove</Button>}
          <Comments blog={blog} handleComment={handleComment} />
            
          
        </div>
      
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  own: PropTypes.bool.isRequired
}


Comments.propTypes = {
  blog: PropTypes.object.isRequired,
  handleComment: PropTypes.func.isRequired,
}

export default Blog