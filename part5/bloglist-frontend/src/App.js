import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const setUserMessage = (message, time) => {
    if (!time) time = 5000; // default timeout is 5sec
    setMessage(message)
    setTimeout(() => {setMessage(null)}, time)
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    setUser(null)
  }

  // get all blogs 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  
  // check if user is already logged in
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const curUser = JSON.parse(loggedUser)
      setUser(curUser)
      blogService.setToken(curUser.token)
    }
  }, [])

  if (!user) return (
    <div>
      <Message message={message} />
      <Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setUser={setUser} setMessage={setUserMessage} />
    </div>
  )
  else return (
    <div>
      <Message message={message} />
      <span>{user.username} is logged in</span>
      <button onClick={logout}>logout</button>
      <br />
      <br />
      <BlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} blogs={blogs} setBlogs={setBlogs} setMessage={setUserMessage} />
      <h2>blogs</h2>
      {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
    </div>
  )
}

export default App