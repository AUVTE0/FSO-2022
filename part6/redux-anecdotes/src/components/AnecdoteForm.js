import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setMessage, removeMessage } from '../reducers/notificationReducer'
import { createNew } from '../services/anecdoteService'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleAdd = async e => {
        e.preventDefault()
        const content = e.target.anecdote.value
        const anecdote = await createNew(content)
        
        dispatch(newAnecdote(anecdote))
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