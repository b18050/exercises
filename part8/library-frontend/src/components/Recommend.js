import React,{useEffect, useState} from 'react'
import { gql, useLazyQuery,useQuery } from '@apollo/client';

const ME = gql`
query{
    me{
      username
      favoriteGenre
    }
  }
`
const FAVORITE_BOOKS = gql`
query allBooks($genre: String) {
    allBooks(genre: $genre){
        title
        published
        author{
        name
        }
        genres
    }
}
`
const Recommend = (props) => {

    const user = useQuery(ME)
   
    const [books, setBooks] = useState([])
    const [allBooks, result] = useLazyQuery(
        FAVORITE_BOOKS
    )
    if(user.data)
        console.log(user.data.me)
    useEffect(() => {    
        if ( user.data  && user.data.me) { 
            const genre = user.data.me.favoriteGenre   
            console.log(genre)  
            allBooks({variables: {genre}})
          }  
      }, [user.data,allBooks]) // eslint-disable-line
  

    useEffect(() => {
        if(result.data){
            const fav_books = result.data.allBooks
            setBooks(fav_books)
        }
    },[result.data,setBooks])

    if(result.loading){
        return <div>loading...</div>
    }

    if (user.error || books.error) {
        return <div>Oops! Something went wrong</div>;
    }

    if(!props.show){
        return(null)
    }

    console.log(books)
    if(books){
        return (
            <div>
              <h4>books in your favorite genre: {user.data.me.favoriteGenre}</h4>
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
                {books.filter(a => a.genres.includes(user.data.me.favoriteGenre)).map(a =>
                  <tr key={a.title}>
                    <td>{a.title}</td>
                    <td>{a.author.name}</td>
                    <td>{a.published}</td>
                  </tr>
                )}
              </tbody>
            </table>
       
            </div>
        )
    }
    return <div>Oops! Something went wrong</div>;
}
  
  export default Recommend