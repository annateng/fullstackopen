import axios from 'axios'

const getService = baseUrl => {
  let token = null

  const setToken = newToken => {
    token = `bearer ${newToken}`
  }

  const getAll = () => {
    return axios.get(baseUrl)
      .then(res => res.data)
  }

  const create = resource => {
    const config = {
      headers: { Authorization: token }
    }

    return axios.post(baseUrl, resource, config)
      .then(res => res.data)
      //.catch(err => err) // YOU NEED TO THROW AN ERROR HERE IF YOU WANT THE PROMISE TO REJECT
  }

  const update = (id, resource) => {
    const config = {
      headers: { Authorization: token }
    }

    return axios.put(`${baseUrl}/${id}`, resource, config)
      .then(res => res.data)
  }

  const deleteEntry = id => {
    const config = {
      headers: { Authorization: token }
    }

    return axios.delete(`${baseUrl}/${id}`, config)
      .then(res => res.data)
  }

  const service = {
    setToken, getAll, create, update, deleteEntry
  }

  return service
}

export const blogService = getService('/api/blogs')
export const loginService = getService('/api/login')
export const userService = getService('/api/users')