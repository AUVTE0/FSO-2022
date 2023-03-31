import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const add = newPersonObj => {
    const req = axios.post(baseUrl, newPersonObj)
    return req.then(res => res.data)
}

const personService = { getAll, add }

export default personService