import { useSelector, useDispatch } from 'react-redux'
import { upvote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filterText = useSelector(state => state.filter)
    const dispatch = useDispatch()
    
    const contains = (a, b) => a.toLowerCase().includes(b.toLowerCase())
    
    const vote = id => {
      console.log('vote', id)
      dispatch(upvote(id))
    }
    console.log(filterText)
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