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
  const [newauthor , setNewauthor] = useState('')
  const [newtitle, setNewtitle] = useState('')
  const [newurl, setNewurl] = useState('')

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
      setErrorMessage('Wrong credentials')
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

  const addBlog = (event) => {
    event.preventDefault()
    console.log('adding new blog ', newblog)

    const blogObject = {
      title: newtitle,
      author: newauthor,
      url: newurl
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewblog('')
        setErrorMessage(`Added ${returnedBlog.title}`)
        setTimeout(() => {
          setErrorMessage('')
        },5000)
      })
      .catch(error => {
        setErrorMessage(`New Blog ${newblog} cannot be added`)
        setTimeout(() => {
          setErrorMessage('')
        },5000)
      })
      
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
      <div>
        title <input value={newtitle} onChange={({target}) => setNewtitle(target.value)}/>
      </div>
      <div>
        author <input value={newauthor} onChange={({target}) => setNewauthor(target.value)}/>
      </div>
      <div>
        url <input value={newurl} onChange={({target}) => setNewurl(target.value)}/>
      </div>

      
      <button type="submit">save</button>
      
    </form>  
    
    
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