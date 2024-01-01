import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { CREATE_BOOK } from '../mutations'
import { ALL_BOOKS, ALL_AUTHORS } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null)
  const [addedBook, setAddedBook] = useState(null);

  const [ addBook, result ] = useMutation(CREATE_BOOK, {
    refetchQueries: [  {query: ALL_BOOKS }, {query: ALL_AUTHORS} ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => `${e.message} \n ${e.extensions.error.message}`)
      setError(messages)
    }
  });

  useEffect(() => {
    if(result?.data?.addBook){
      setAddedBook(result.data.addBook.title);
      setTimeout(() => {
        setAddedBook(null);
      }, 3000)
    }
  }, [result.data, props.show])

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    
    event.preventDefault()
    setError(null);
    console.log('add book...')

    await addBook({ variables: {title, author, published: parseInt(published), genres}})
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
        addedBook && 
          <div style={{color: 'green'}}>
            Successfully added new book: {addedBook}
          </div>
      }
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