import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from 'react-query'
import axios from 'axios'
import {getAll} from './requests'

const App = () => {

  const { isLoading, isError, data, error }  = useQuery('anecdotes', getAll)
  
  const handleVote = (anecdote) => {
    console.log('vote')
  }

  // const anecdotes = [
  //   {
  //     "content": "If it hurts, do it more often",
  //     "id": "47145",
  //     "votes": 0
  //   },
  // ]

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
