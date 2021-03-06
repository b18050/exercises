import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams
} from "react-router-dom"
import Container from '@material-ui/core/Container'
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
  }, [dispatch])

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
            {/* username */}
            <TextField label="username"  onChange={({ target }) => setUsername(target.value)}/>
            {/* <input
              id='username'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            /> */}
          </div>
          <div>
            {/* password */}
            {/* <input
              id='password'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            /> */}
            <TextField  label="password" type='password' onChange={({ target }) => setPassword(target.value)} />
          </div>
          <Button variant="contained" color="primary" type="submit">
            login
          </Button>
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

    

    const BlogList = ({blog}) => {
      return(
        <div>
          <TableCell><Link to={`/blogs/${blog.id}`}>{blog.title}</Link> </TableCell>
          <TableCell>{blog.author}</TableCell>
        </div>
      )
    }

    return(
      <div>
        <Togglable  buttonLabel='create new blog'  ref={blogFormRef}>
          <NewBlog addBlog={addBlog} />
        </Togglable>
        <TableContainer component={Paper}>
          <Table>
            <TableBody >
              {blogs.sort(byLikes).map(blog =>
                <TableRow><BlogList
                  key={blog.id}
                  blog={blog}
                />
                </TableRow>
                
              )}
            </TableBody>
          </Table>
        </TableContainer>
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
    <Container>
      <div>
        <h2>blogs</h2>
        <Notification />
        
        
        <div>
          <div>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu">
                </IconButton>
                <Button color="inherit" component={Link} to="/">
                  blogs
                </Button>
                
                <Button color="inherit" component={Link} to="/users">
                  users
                </Button>
                
                <Button color="inherit">
                {user.name} logged in <Button variant="contained" color="default" onClick={handleLogout}>logout</Button>
                </Button>
                </Toolbar>
            </AppBar>
          </div>
    
        </div>
          <Switch>
          <Route path="/users/:id">        
              <User users={users} />      
          </Route>
          <Route path="/blogs/:id">        
              <Blog blogs={blogs} handleLike={handleLike} handleRemove={handleRemove}/>      
          </Route>
        <Route path="/users">
          <Users users={users} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
       
       
      </Switch>

          
        
      </div>
    </Container>
  )
}

export default App