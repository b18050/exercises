import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'


const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newblog , setNewblog] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin =  async (event) => {
    event.preventDefault()
    console.log('event logging',username, password)
    try{
      const user = await loginService.login( { username, password } )
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch(exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)},5000)
    }
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log('adding new blog ', newblog)
    
  } 

  const loginForm = () => (
      <form onSubmit = {handleLogin} >
      <div>
        Username <input type='text' value = {username} name="Username" onChange={({target}) => setUsername(target.value)} />
      </div>
      <div>
        Password <input type='password' value = {password} name="Password" onChange={({target}) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input
        value={newblog}
        onChange={({target}) => setNewblog(target.value)}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div> 
      
      <Notification message={errorMessage} />


      {user === null ? loginForm() :
      <div>
        <p>{user.name} logged in</p>
        {blogForm()}
      </div>
    }
    
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App