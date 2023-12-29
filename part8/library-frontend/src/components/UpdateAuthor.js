import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { UPDATE_AUTHOR } from '../mutations'
import { ALL_AUTHORS } from '../queries'
import Select from 'react-select';

const UpdateAuthor = ({ nameOpts }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const [error, setError] = useState(null)

  const [ addBook ] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS} ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message)
      setError(messages)
    }
  });

  const submit = async (event) => {
    
    event.preventDefault()
    setError(null);
    console.log('edit author...')

    const result = await addBook({ variables: {name, born: parseInt(born)} })
    
    if(!result.data.editAuthor) {
        setError(['Author not found'])
    }
    else if(!error) {
      setName('')
      setBorn('')
    }
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
          name
          {/* <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          /> */}
        <Select
            defaultValue={name}
            onChange={e => setName(e.value)}
            options={nameOpts?.map(n => ({value: n, label: n}))}
        />
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default UpdateAuthor