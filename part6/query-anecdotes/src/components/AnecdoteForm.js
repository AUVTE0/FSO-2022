import { useMutation, useQueryClient } from 'react-query'
import { createNew } from '../requests'
import { useMessageDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createNew)
  const messageDispatch = useMessageDispatch()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content, {
      onSuccess: anecdote => { 
        queryClient.invalidateQueries('anecdotes')
        messageDispatch({
          type: 'SET',
          payload: `you created '${anecdote.content}'`
        })
        setTimeout(() => messageDispatch({
          type: 'REMOVE'
        }), 5000)
      },
      onError: error => {
        messageDispatch({
          type: 'SET',
          payload: `${error.response.data.error}`
        })
        setTimeout(() => messageDispatch({
          type: 'REMOVE'
        }), 5000)
      }
    })
    
  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
