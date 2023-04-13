import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleAdd = e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        dispatch(newAnecdote(content))
    }
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