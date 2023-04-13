import { useSelector, useDispatch } from 'react-redux'
import { upvote, newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = ({handleAdd}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleAdd}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm