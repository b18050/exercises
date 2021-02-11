import React,{useState} from 'react'
import { gql, useQuery } from '@apollo/client';

const ALL_BOOKS = gql`
query{
  allBooks{
    author{
      name
    }
    title
    published
    genres
  }
}
`

const Books = (props) => {
  
  const [genre,setGenre] = useState(null)

  const result = useQuery(ALL_BOOKS)

  if(result.loading){
    return <div>loading...</div>
  }

  console.log(genre)

 const genreList = ["refactoring","patterns","design","agile","crime","classic","all_genres"]
 
 if (!props.show) {
   return null
  }
  if(genre==null || genre=='all_genres'){
    return (
      <div>
        <h2>books</h2>
  
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>
                author
              </th>
              <th>
                published
              </th>
            </tr>
            {result.data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )}
          </tbody>
        </table>
        <div>
          <br></br>
        </div>
          <div>
          {genreList.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
          </div>
        </div>
    
    )

  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.filter(a => a.genres.includes(genre)).map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <br></br>
      </div>
      <div>
      {genreList.map(g => <button key={g} onClick={() => setGenre(g)}>{g}</button>)}
      </div>
    </div>

)
  
}

export default Books