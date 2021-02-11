import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import LoginForm from './components/LoginForm'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import { gql, useApolloClient ,useMutation, useSubscription} from '@apollo/client';

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      author{
        name
      }
    }
  }
`

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)
  const client = useApolloClient()
  const notify = (message) => {    
    setErrorMessage(message)    
    setTimeout(() => {      
      setErrorMessage(null)    
    }, 10000)  
  }

  const logout = () => {    
    console.log(' logout')
    setToken(null)    
    localStorage.clear()    
    client.resetStore()  
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const title = subscriptionData.data.bookAdded.title
      console.log(title)
      window.alert(`new Book` + title + `Added`)
    }
  })

  return (
    <div>
      <div>
      <Notify errorMessage={errorMessage} />
      </div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {!token && <button onClick={() => setPage('login')}>login</button> }
        {token && <button onClick={logout}>logout</button> }

      </div>

      <Authors
        show={page === 'authors'} setError={notify} edit={ token != null }
      />

      <Books
        show={page === 'books'}
      />

      {token && <NewBook
        show={page === 'add'} setError={notify}
      />}

      {token && <Recommend 
        show = {page === 'recommend'} setError={notify}
      /> }

      <LoginForm show={page === 'login'} setToken={setToken} setError={notify}/>
      {/* {!token && <LoginForm setToken={setToken}/>  }
      {token && <Logout logout={logout}/>} */}

    </div>
  )
}

const Notify = ({errorMessage}) => {  
  if ( !errorMessage ) {    
    return null  
  }  
  return (    
    <div style={{color: 'red'}}>    
    {errorMessage}    
    </div>  
  )
}

export default App