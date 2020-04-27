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

const create = (title, author, url) => {
  const config = {
    headers: { Authorization: token }
  }
  const newBlog = {
    title,
    author,
    url
  }

  return axios.post(baseUrl, newBlog, config)
    .then(res => res.data)
    //.catch(err => err)
}

export default { getAll, create, setToken }