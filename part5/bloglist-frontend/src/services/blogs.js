import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log('setting token:', newToken)
  token = `Bearer ${newToken}`
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
  const config = {
    headers: { Authorization: token}
  }
  const res = await axios.post(baseUrl, blog, config)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken}