import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { getAll } from './services/anecdoteService'

const App = () => {
  
  const dispatch = useDispatch()
  useEffect(() => {
    const getAnecdotes = async() => {
      const data = await getAll()
      console.log(data)
      dispatch(setAnecdotes(data))
    }
    getAnecdotes()
  })
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification /> <br/>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App