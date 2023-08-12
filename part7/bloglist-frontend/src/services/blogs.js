import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log('setting token:', newToken)
  token = `Bearer ${newToken}`
}

const config = () => {
  return {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}
// const getOne = async id => {
//   const res = await axios.get(baseUrl+`/${id}`)
//   return res.data
// }
const create = async blog => {
  const res = await axios.post(baseUrl, blog, config())
  return res.data
}

const update = async (blog) => {
  const res = await axios.put(`${baseUrl}/${blog.id}`, blog, config())
  return res.data
}

const remove = async (blog) => {
  const res = await axios.delete(`${baseUrl}/${blog.id}`, config())
  return res.data
}

export default { getAll, create, setToken, update, remove }