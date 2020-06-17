import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

const loginHandle =  (event) => {
  event.preventDefault()
  console.log('event logging',user, password)
}

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App