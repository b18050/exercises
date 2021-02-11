import React, { useState }  from 'react'
import { gql, useQuery,useMutation } from '@apollo/client';
import Select from 'react-select';

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

  // const [name, setName] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [born, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: 
      ALL_AUTHORS } ]
  })
  if (!props.show) {
    return null
  }
  if(result.loading){
    return <div>loading...</div>
  }
  const options = result.data.allAuthors.map(a => ({
    value: String(a.name),
    label: String(a.name)
  }))
  console.log(options)
  const submit = (event) => {
    event.preventDefault()
    const name = String(selectedOption.value)
    console.log(selectedOption)
    editAuthor({  variables: { name, born } })
    console.log('edit author...')

    // setName('')
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
      { props.edit && <div>
        <h3>Set birth year</h3>
          <form onSubmit={submit}>
            <div>
              name
              {/* <input
                value={name}
                onChange={({ target }) => setName(target.value)}
              /> */}
              <Select
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                options={options}
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
              
      </div> }
    </div>
  )
}

export default Authors
