import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  return axios.post(baseUrl, blog, config)
    .then(res => res.data)
    //.catch(err => err) // YOU NEED TO THROW AN ERROR HERE IF YOU WANT THE PROMISE TO REJECT
}

const update = (id, blog) => {
  const config = {
    headers: { Authorization: token }
  }
  console.log('config: ', config)

  return axios.put(`${baseUrl}/${id}`, blog, config)
    .then(res => res.data)
}

const deleteEntry = (id) => {
  const config = {
    headers: { Authorization: token }
  }

  return axios.delete(`${baseUrl}/${id}`, config)
    .then(res => res.data)
}

export default { setToken, getAll, create, update, deleteEntry }