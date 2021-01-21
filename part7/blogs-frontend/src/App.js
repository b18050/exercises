import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'

import blogService from './services/blogs'
import loginService from './services/login'
import storage from './utils/storage'

import { hideNotification, setNotification} from './reducers/notificationReducer'
import {intializeBlogs, createBlog, likeBlog,removeBlog } from './reducers/blogReducer'
import {initializeUser , setUser} from './reducers/userReducer'

import {useSelector,useDispatch} from 'react-redux'


const App = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = React.createRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(intializeBlogs(blogs))
    )
  }, [dispatch])


  useEffect(() => {
    const user = storage.loadUser()
 
    dispatch(initializeUser(user))
  }, [])

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      setUsername('')
      setPassword('')

      dispatch(setUser(user))
      
      const message = `${user.name} welcome back!`
      dispatch(setNotification(message,'success'))

      setTimeout(() => {
        dispatch(hideNotification())
      },5000)
      storage.saveUser(user)
    } catch(exception) {
      const message = `wrong username/password`

      dispatch(setNotification(message,'failure'))

      setTimeout(() => {
        dispatch(hideNotification())
      },5000)
      
    }
  }

  const addBlog = async (blog) => {
    try {
      const newBlog = await blogService.create(blog)
      blogFormRef.current.toggleVisibility()

      dispatch(createBlog(newBlog))
      
      const message = `a new blog '${newBlog.title}' by ${newBlog.author} added!`
      dispatch(setNotification(message,'success'))

      setTimeout(() => {
        dispatch(hideNotification())
      },5000)
    } catch(exception) {
      console.log(exception)
    }
  }

  const handleLike = async (id) => {
    const blogToLike = blogs.find(b => b.id === id)
    const likedBlog = { ...blogToLike, likes: blogToLike.likes + 1, user: blogToLike.user.id }
    await blogService.update(likedBlog)
    dispatch(likeBlog(id))
    }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find(b => b.id === id)
    const ok = window.confirm(`Remove blog ${blogToRemove.title} by ${blogToRemove.author}`)
    if (ok) {
      await blogService.remove(id)
      dispatch(removeBlog(id))
    }
  }

  const handleLogout = () => {
    dispatch(setUser(null))
    storage.logoutUser()
  }

  if ( !user ) {
    return (
      <div>
        <h2>login to application</h2>

        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id='login'>login</button>
        </form>
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
     

      <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
        <NewBlog addBlog={addBlog} />
      </Togglable>

      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleRemove={handleRemove}
          own={user.username===blog.user.username}
        />
      )}
    </div>
  )
}

export default App