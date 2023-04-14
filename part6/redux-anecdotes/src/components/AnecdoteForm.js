import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleAdd = async e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        createAnecdote(content)
        dispatch(setMessage(
            `you added '${content}'`
            ))
        setTimeout(() => dispatch(removeMessage()), 5000)
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