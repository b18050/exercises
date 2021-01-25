import React, { useState } from 'react'
import {
  useParams
} from "react-router-dom"
import { useDispatch } from 'react-redux'
import {addComment} from './../reducers/blogReducer'
import PropTypes from 'prop-types'

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
      <input
            id='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
      <button> Add Comment</button>
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
          {<div>likes {blog.likes}
            <button onClick={() => handleLike(blog.id)}>like</button>
          </div>}
          <a href={blog.url}>{blog.url}</a>
          <div>added by {blog.user.name}</div>
        </div>
          {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
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