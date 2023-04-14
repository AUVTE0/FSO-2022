import { useSelector, useDispatch } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filterText = useSelector(state => state.filter)
    const dispatch = useDispatch()
    console.log(anecdotes)
    
    const contains = (a, b) => {
        console.log(a, b)
        return a.toLowerCase().includes(b.toLowerCase())}
    
    const vote = async id => {
      const anecdote = anecdotes.find(a => a.id === id)
      dispatch(upvoteAnecdote(anecdote))
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