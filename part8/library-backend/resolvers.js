const Author = require('./models/Author');
const Book = require('./models/Book');
const User = require('./models/User');
const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
      me: (root, args, context) => {
        return context.currentUser
      },
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
        const authors = await Author.find();
        const books = await Book.find().populate('author');

        return authors.map(author => ({
          name: author.name,
          born: author.born,
          bookCount: books.find(book => book.author.name === author.name).length || 0
        }))
      }
    },
    Mutation: {
      addBook: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
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
        await newBook.save()      
          .catch(error => {
            throw new GraphQLError('Adding book failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.title,
                error
              }
            })
          });

        pubsub.publish('BOOK_ADDED', {bookAdded: newBook})

        return newBook;
      },
      editAuthor: async (root, args, context) => {
        const currentUser = context.currentUser
        if (!currentUser) {
          throw new GraphQLError('not authenticated', {
            extensions: {
              code: 'BAD_USER_INPUT',
            }
          })
        }
        return Author.findOneAndUpdate(
          {name: args.name}, 
          {born: args.setBornTo},
          {new: true},
        );
      },
      createUser: async (root, args) => {
        const user = new User({ username: args.username })
        return user.save()
          .catch(error => {
            throw new GraphQLError('Creating the user failed', {
              extensions: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.username,
                error
              }
            })
          })
      },
      login: async (root, args) => {
        const user = await User.findOne({ username: args.username })
        if ( !user || args.password !== 'secret' ) {
          throw new GraphQLError('wrong credentials', {
            extensions: {
              code: 'BAD_USER_INPUT'
            }
          })        
        }
        const userForToken = {
          username: user.username,
          id: user._id,
        }
        return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
      },
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        }
    }
}

module.exports = resolvers