import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'


const App = () => {

  const blogFormRef = React.createRef()

  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin =  async (event) => {
    event.preventDefault()
    console.log('event logging',username, password)
    try{
      const user = await loginService.login( { username, password } )
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      console.log(window.localStorage.loggedBlogappUser)
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)},5000)
    }
  }

  const handleLogout = () => {
    console.log('logging out')
    console.log(window.localStorage.loggedBlogappUser)
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
      }) 
  } 

  const loginForm = () => (

      <Togglable buttonLabel='login'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
  
  )

  const blogForm = () => (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog = {addBlog} /> 
      </Togglable>   
  )

  
  return (
    <div> 
      
      <Notification message={errorMessage} />


      {
        user === null ? loginForm() :
        <div>
          <p>{user.name} logged in</p>
        
          {blogForm()}
          </div>
      }
      
      {
        user === null ? '' :
        <div> 
          <h2>Blogs</h2>
          { blogs.map (blog =>  <Blog key={blog.id} blog={blog} /> ) }
          <button onClick={handleLogout}> Logout</button>
        </div>
      }
          
      
    
      
    </div>
  )
}

export default App