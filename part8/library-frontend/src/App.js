import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import Login from './components/Login'
import { BOOK_ADDED } from './subscriptions'
import { useSubscription } from '@apollo/client'
import { ALL_BOOKS } from './queries'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByTitle = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }
  console.log('updating cache...')
  console.log(addedBook)
  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allPersons: uniqByTitle(allBooks.concat(addedBook)),
    }
  })
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    if(page === 'login' && token){
      setPage('books');
    }
  }, [page, token]);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      console.log(data.data)
      const addedBook = data.data.bookAdded;
      window.alert(`New book added: ${addedBook.title}!`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const logout = () => {
    setToken(null);
    console.log('loging out')
    console.log(token);
    localStorage.removeItem('library-user-token');
  }

  return (
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
  )
}

export default App
