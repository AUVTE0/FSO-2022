import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/notificationReducer'
import { update } from '../services/anecdoteService'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filterText = useSelector(state => state.filter)
    const dispatch = useDispatch()
    console.log(anecdotes)
    
    const contains = (a, b) => {
        console.log(a, b)
        return a.toLowerCase().includes(b.toLowerCase())}
    
    const vote = async id => {
      console.log('vote', id)
      const anecdote = anecdotes.find(a => a.id === id)
      const newObj = {...anecdote, votes: anecdote.votes +1}
      await update(newObj)
      
      dispatch(upvote(id))
      dispatch(setMessage(
        `you voted for '${anecdote.content}'`
        ))
      setTimeout(() => dispatch(removeMessage()), 5000)
    }
    console.log('filter', filterText)
    return anecdotes
        .filter(a => contains(a.content, filterText))
        .sort((a,b) => b.votes - a.votes).map(anecdote =>
    <div key={anecdote.id}>
        <div>
        {anecdote.content}
        </div>
        <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
    </div>
    )
}

export default AnecdoteList