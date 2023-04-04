import axios from 'axios'
// const baseUrl = 'http://localhost:3001/api/persons'
const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const add = newPersonObj => {
    const req = axios.post(baseUrl, newPersonObj)
    return req.then(res => res)
}

const remove = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const update = updatedPersonObj => {
    const req = axios.put(`${baseUrl}/${updatedPersonObj.id}`, updatedPersonObj)
    return req.then(res => res.data)
}

const personService = { getAll, add, remove, update }

export default personService