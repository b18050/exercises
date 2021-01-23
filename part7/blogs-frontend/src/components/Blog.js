import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link,useParams
} from "react-router-dom"
import PropTypes from 'prop-types'

const Blog = ({ blogs, handleLike, handleRemove, own }) => {
  
  console.log(blogs)
  const id = useParams().id  
  const blog = blogs.find(b => b.id === id)
  console.log(blog)
  if(!blog) return null
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

export default Blog