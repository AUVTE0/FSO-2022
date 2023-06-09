import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
    const res = await axios.get(baseUrl)
    console.log(res.data)
    return res.data
}

const createNew = async content => {
    const anecdote = {
        content: content,
        id: getId(),
        votes: 0
    }
    const res = await axios.post(baseUrl, anecdote)
    return res.data
}

const update = async anecdote => {
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
    return res.data
}

export { getAll, createNew, update }