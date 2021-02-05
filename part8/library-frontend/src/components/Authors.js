import React, { useState }  from 'react'
import { gql, useQuery,useMutation } from '@apollo/client';

const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name,
    setBornTo: $born
  ) {
    name
    born
  }
}
` 

const Authors = (props) => {
  
  const result = useQuery(ALL_AUTHORS);

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })
  if (!props.show) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()
    
    editAuthor({  variables: { name, born } })
    console.log('edit author...')

    setName('')
    setBorn('')

  }
  
  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                born
              </th>
              <th>
                books
              </th>
            </tr>
            {result.data.allAuthors.map(a =>
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Set birth year</h3>
          <form onSubmit={submit}>
            <div>
              name
              <input
                value={name}
                onChange={({ target }) => setName(target.value)}
              />
            </div>
            <div>
              born
              <input
                value={born}
                onChange={({ target }) => setBorn(parseInt(target.value))}
              />
            </div>
            <button type='submit'>update author</button>
        </form>
              
      </div>
    </div>
  )
}

export default Authors
