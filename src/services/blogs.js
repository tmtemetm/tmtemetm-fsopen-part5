import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const getConfig = () => ({
  headers: { Authorization: token }
})

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const clearToken = () => {
  token = null
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const response = await axios.post(baseUrl, blog, getConfig())
  return response.data
}

const like = async blog => {
  const response = await axios.put(`${baseUrl}/${blog.id}`,
    { ...blog, likes: blog.likes + 1 })
  return response.data
}

const deleteBlog = async blog =>
  await axios.delete(`${baseUrl}/${blog.id}`, getConfig())

export default {
  setToken,
  clearToken,
  getAll,
  create,
  like,
  deleteBlog
}
