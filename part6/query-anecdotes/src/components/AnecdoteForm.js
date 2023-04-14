import { useMutation, useQueryClient } from 'react-query'
import { createNew } from '../requests'
import { useMessageDispatch } from '../NotificationContext'

const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(createNew, {
    onSuccess: anecdote => { 
      queryClient.invalidateQueries('anecdotes')
      messageDispatch({
        type: 'SET',
        payload: `you created '${anecdote.content}'`
      })
      setTimeout(() => messageDispatch({
        type: 'REMOVE'
      }), 5000)
    }
  })
  const messageDispatch = useMessageDispatch()
  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
    
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
