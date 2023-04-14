import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAll, update } from './requests'

const App = () => {

  const queryClient = useQueryClient()
  
  const { isLoading, isError, data, error }  = useQuery('anecdotes', getAll)
  
  const newAnecdoteMutation = useMutation(update, {
    onSuccess: () => queryClient.invalidateQueries('anecdotes')
  })
  
  const handleVote = (anecdote) => {
    console.log('vote')
    newAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  if(isLoading)
    return <div>Loading data ...</div>
  if(isError)
    return <div>anecdote service not available due to server issues: {error.message}</div>
  
  const anecdotes = data

    return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
