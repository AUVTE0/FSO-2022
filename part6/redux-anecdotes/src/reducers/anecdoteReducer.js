import { createSlice } from '@reduxjs/toolkit'
import { getAll, createNew, update } from '../services/anecdoteService'

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]



// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      return state.concat((action.payload))
    },
    upvote(state, action) {
      const id = action.payload
      const anecdote = state.find(a => a.id === id)
      const updatedObj = {...anecdote, votes: anecdote.votes + 1}
      return state.map( a => a.id !== id? a: updatedObj)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})
export const { upvote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const anecdote = await createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}

export const upvoteAnecdote = anecdote => {
  return async dispatch => {
    const newObj = {...anecdote, votes: anecdote.votes +1}
    await update(newObj)
    dispatch(upvote(anecdote.id))
  }
}

export default anecdoteSlice.reducer

