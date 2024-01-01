import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'

import { setContext } from '@apollo/client/link/context'

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

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

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
          {token && <button onClick={() => logout()}>logout</button>}
        </div>

        <Authors show={page === 'authors'} />
        <Books show={page === 'books'} />
        <Login show={page === 'login'} setToken={setToken}/>
        <NewBook show={token && page === 'add' } />
      </div>
    </ApolloProvider>
  )
}

export default App
