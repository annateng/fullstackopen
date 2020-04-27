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

  const newBlog = {
    title: blog.title,
    author: blog.author,
    url: blog.url
  }

  return axios.post(baseUrl, newBlog, config)
    .then(res => res.data)
    //.catch(err => err) // YOU NEED TO THROW AN ERROR HERE IF YOU WANT THE PROMISE TO REJECT
}

export default { getAll, create, setToken }