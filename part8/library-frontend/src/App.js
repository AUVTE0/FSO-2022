import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
  split
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const wsLink = new GraphQLWsLink(
  createClient({ url: 'ws://localhost:4000' })
)

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  authLink.concat(httpLink)
)

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: splitLink
})

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    if(page === 'login' && token){
      setPage('books');
    }
  }, [page, token]);

  const logout = () => {
    setToken(null);
    console.log('loging out')
    console.log(token);
    localStorage.removeItem('library-user-token');
  }

  return (
    <ApolloProvider client={client} >
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          {!token && <button onClick={() => setPage('login')}>login</button>}
          {token && <button onClick={() => setPage('add')}>add book</button>}
          {token && <button onClick={() => setPage('recommend')}>recommend</button>}
          {token && <button onClick={() => logout()}>logout</button>}
        </div>

        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <Login show={page === 'login'} setToken={setToken}/>
        <NewBook show={token && page === 'add' } />
        <Recommend show={token && page === 'recommend' }  />
      </div>
    </ApolloProvider>
  )
}

export default App
