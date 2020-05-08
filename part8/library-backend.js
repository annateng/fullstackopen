const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { Book, Author } = require('./schemas/schemas')
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
const MONGODB_URI = 'mongodb+srv://fullstack:7ZNenJIDx0PVdn5P@cluster0-iix28.mongodb.net/library?retryWrites=true&w=majority'
console.log('connecting to...', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('connected to MongoDB') })
  .catch(err => { console.error('error connecting to MongoDB: ', err.message) })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'The Demon ',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
]

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: String!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).then(res => res.length),
    authorCount: () => Author.find({}).then(res => res.length),
    allBooks: async(root, args) => {
      let booksOut = await Book.find({})
      // if (args.author) booksOut = booksOut.filter(b => b.author === args.author)
      if (args.genre) booksOut = booksOut.filter(b => b.genres.includes(args.genre))
      return booksOut
    },
    allAuthors: () => Author.find({}).then(res => res)
  },
  Author: {
    bookCount: root => books.filter(b => b.author === root.name).length
  },
  Mutation: {
    addBook: async(root, args) => {
      let thisAuthor = await Author.findOne({ name: args.author })
      if (!thisAuthor) {
        const newAuthor = new Author({ name: args.author })
        try { thisAuthor = await newAuthor.save() }
        catch (err) { throw new UserInputError(err.message, { invalidArgs: args })}
      }

      const newBook = new Book({
        title: args.title,
        author: thisAuthor._id,
        published: args.published,
        genres: args.genres
      })

      try { await newBook.save() }
      catch (err) { throw new UserInputError(err.message, { invalidArgs: args }) }
      return newBook
    },
    editAuthor: async(root, args) => {
      const thisAuthor = await Author.findOne({ name: args.name })
      if (!thisAuthor) return null
      
      thisAuthor.born = args.setBornTo
      try { await thisAuthor.save() }
      catch (err) { throw new UserInputError(err.message, { invalidArgs: args })}
      return thisAuthor
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