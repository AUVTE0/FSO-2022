const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { uuid } = require('uuidv4');
const { GraphQLError } = require('graphql')


const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/Author');
const Book = require('./models/Book');

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
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
      title: String!, 
      author: String!,
      published: Int!, 
      genres: [String!]!
    ): Book!

    editAuthor(
      name: String!,
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filters = {};
      if(args.genre) {
        filters.genres = args.genre;
      }
      if(args.author) {
        filters.author = await Author.findOne({name: args.author});
      }
      return Book.find(filters).populate('author')
    },
    allAuthors: async () => {
      return Author.find();
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      
      let author = await Author.findOne({ name: args.author })

      if(!author) {
        const newAuthor = new Author({
          name: args.author,
        })
        author = await newAuthor.save().catch(error => {
          throw new GraphQLError('Saving new author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        });
      }
      
      const newBook = new Book({
        ...args,
        author,
      });
      return newBook.save()      
        .catch(error => {
          throw new GraphQLError('Adding book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.title,
              error
            }
          })
        });
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name);
      if(!author) {
        return null;
      }
      author.born = args.setBornTo;
      return {
        ...author,
        bookCount: books.filter(book => book.author === author.name).length
      };
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})