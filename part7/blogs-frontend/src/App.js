import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Users from './components/Users'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

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

  const [users, setUsers] = useState([])
  useEffect(() => {
        userService.getAll()
                      .then(users => setUsers(users))
        
        
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
        <Notification />

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

  const padding = {
    padding: 5
  }

  const Home = () => {
    console.log('home')

    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const BlogList = ({blog}) => {
      return(
        <div style={blogStyle} className='blog'>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )
    }

    return(
      <div>
        <Togglable buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog addBlog={addBlog} />
        </Togglable>

        <div >
          {blogs.sort(byLikes).map(blog =>
            <BlogList
              key={blog.id}
              blog={blog}
            />
            
          )}
        </div>
      </div>

    )
    
  }

  const User = ({users}) => {
    // if(!users) return null
    console.log(users)
    const id = useParams().id  
    const user = users.find(u => u.id === id) 
    if(!user) return null
    console.log(user)
    const blogList = user.blogs
    return(
        <div>
        <div>
        <h3>{user.name} </h3>
        <h3> added blogs </h3>
        <ul>
            {blogList.map(blog => <li>{blog.title}</li>)}
        </ul>
       
      </div>

        </div>
    )
}

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      
      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>
      <div>
        <Link style={padding} to="/users">users</Link>
        <Link style={padding} to="/">home</Link>
        
  
      </div>
         <Switch>
         <Route path="/users/:id">        
            <User users={users} />      
         </Route>
         <Route path="/blogs/:id">        
            <Blog blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} />      
         </Route>
       <Route path="/users">
         <Users users={users} />
       </Route>
       <Route path="/">
         <Home />
       </Route>
       
       
     </Switch>

        
      
    </div>
  )
}

export default App