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
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const typeDefs = gql`

  type Query {
      bookCount: Int!
      authorCount: Int!
      allBooks(genre: String, author: String): [Book!]!
      allAuthors: [Author!]
      me: User
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]
    ): Book,

    addAuthor(
      name: String!,
      born: Int!,
      bookCount: Int
    ): Author,

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author,

    createUser(
      username: String!
      favoriteGenre: String!
    ): User,

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {

    bookCount: () => Book.collection.countDocuments(),

    authorCount: () => Author.collection.countDocuments(),

    allBooks: (root, args) =>  {
      // if(args.author && args.genre)
      //   return books.filter(b => b.genres.includes(args.genre) && b.author == args.author)
      // else if(args.author){
      //   return books.filter(b => b.author == args.author)
      // }
      if(args.genre) {
        return Book.find( { genres: { $in: [args.genre]}})
      }
      else {
        return Book.find({})
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
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {

    addBook: async (root, args) => {
      const book = new Book({ ...args})
      try {
        await book.save()
      } catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },

    addAuthor: (root, args) => {
      const author = new Author({ ...args })
      try{
        await author.save()
      } catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne( {name: args.name})
      author.born = args.setBornTo
      try{
        author.save()
      }catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'sekred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {    
    const auth = req ? req.headers.authorization : null    
    if (auth && auth.toLowerCase().startsWith('bearer ')) {      
      const decodedToken = jwt.verify(        
        auth.substring(7), JWT_SECRET      
      )      
      const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')      
  return { currentUser }    }  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
