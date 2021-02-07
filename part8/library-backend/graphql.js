const { ApolloServer, gql } = require('apollo-server')

const Book = require('./models/book')
const Author = require('./models/author')

const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
const password = process.argv[2]

const MONGODB_URI = `mongodb+srv://sekred:${password}@cluster0.gx21s.mongodb.net/<dbname>?retryWrites=true&w=majority`
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = gql`

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(genre: String, author: String): [Book!]!
      allAuthors: [Author!]
  }

  type Book {
    title: String!
    published: Int!
    author: Author
    id: ID!
    genres: [String!]
  }

  type Author {
      name: String!
      id: ID!
      born: Int
      bookCount: Int
  }

  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]
    ): Book,

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) =>  {
      if(args.author && args.genre)
        return books.filter(b => b.genres.includes(args.genre) && b.author == args.author)
      else if(args.author){
        return books.filter(b => b.author == args.author)
      }
      else if(args.genre) {
        return books.filter(b => b.genres.includes(args.genre))
      }
      else {
        return books
      }
    },
    allAuthors: () => {
        // return Author.map(a => (
        //     {
        //         name: a.name,
        //         bookCount: books.filter(b => b.author == a.name).length,
        //         born: a.born
        //     }
        // ))
        return Author.find({})
    }
  },
  Mutation: {

    addBook: (root, args) => {
      const book = new Book({ ...args})
      return book.save()
    },

    editAuthor: async (root, args) => {
      // const author = authors.find(a => a.name == args.name)
      // if(!author) 
      //   return null
      // const updatedAuthor = { 
      //                         name: author.name,
      //                         id: author.id,
      //                         born: args.setBornTo
      //                       }
      // authors = authors.map(a => a.name != args.name ? a : updatedAuthor )
      // return updatedAuthor
      const author = Author.findOne( {name: args.name})
      author.born = args.setBornTo
      return author.save()
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
