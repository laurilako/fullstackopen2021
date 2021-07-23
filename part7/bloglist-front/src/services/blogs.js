import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const removeBlog = async (id) => {
  const auth = { 
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, auth)
  return response
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  return response.data
}

const comment = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, {comment})
  return request.data
}

export default { getAll, create, update, removeBlog, setToken, comment } 