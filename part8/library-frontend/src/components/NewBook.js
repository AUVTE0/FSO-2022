import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_BOOK } from '../mutations'
import { ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null)

  const [ addBook ] = useMutation(CREATE_BOOK, {
    refetchQueries: [  {query: ALL_BOOKS }, {query: ALL_AUTHORS} ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message)
      setError(messages)
    }
  });

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    
    event.preventDefault()
    setError(null);
    console.log('add book...')

    addBook({ variables: {title, author, published: parseInt(published), genres}})
    if(!error) {
      setTitle('')
      setPublished('')
      setAuthor('')
      setGenres([])
      setGenre('')
    }
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      {
        error && error?.map(e => (
          <div key={e} style={{color: 'red'}}>
            {e}
          </div>
        ))
      }
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook