const { ApolloServer, gql, UserInputError } = require('apollo-server')
const { Book, Author, User } = require('./schemas/schemas')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

// outdated dependencies
mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)

// hardcoded mongodb uri
const MONGODB_URI = 'mongodb+srv://fullstack:7ZNenJIDx0PVdn5P@cluster0-iix28.mongodb.net/library?retryWrites=true&w=majority'
console.log('connecting to...', MONGODB_URI)
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => { console.log('connected to MongoDB') })
  .catch(err => { console.error('error connecting to MongoDB: ', err.message) })

// HARDCODED AUTHENTICATION STUFF
const SECRET_CODE = 'fullstackopen'
const password = 'b00B13z'

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
    author: Author!
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
    me: User!
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
      favoriteGenre: String
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
      let booksOut = await Book.find({}).populate('author')
      // if (args.author) booksOut = booksOut.filter(b => b.author === args.author)
      if (args.genre) booksOut = booksOut.filter(b => b.genres.includes(args.genre))
      return booksOut
    },
    allAuthors: () => Author.find({}).then(res => res),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: root => Book.find({ author: root.id }).then(res => res.length)
  },
  Mutation: {
    addBook: async(root, args, context) => {
      if (!context.currentUser) throw new UserInputError('not authenticated')
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

      try { 
        await newBook.save() 
        await newBook.populate('author').execPopulate()
      }
      catch (err) { throw new UserInputError(err.message, { invalidArgs: args }) }
      return newBook
    },
    editAuthor: async(root, args, context) => {
      if (!context.currentUser) throw new UserInputError('not authenticated')
      const thisAuthor = await Author.findOne({ name: args.name })
      if (!thisAuthor) return null
      
      thisAuthor.born = args.setBornTo
      try { await thisAuthor.save() }
      catch (err) { throw new UserInputError(err.message, { invalidArgs: args })}
      return thisAuthor
    },
    createUser: async(root, args) => {
      const newUser = new User({...args})
      try { await newUser.save() }
      catch (err) { throw new UserInputError(err.message, { invalidArgs: args }) }
      return newUser
    },
    login: async(root, args) => {
      const thisUser = await User.findOne({ username: args.username })
      if (!thisUser || args.password !== password) throw new UserInputError('Wrong Credentials')

      return { value: jwt.sign({ id: thisUser._id }, SECRET_CODE) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), SECRET_CODE)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})