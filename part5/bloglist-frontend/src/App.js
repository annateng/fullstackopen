import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [newBlogToggle, setNewBlogToggle] = useState(false)

  const blogServiceCreate = (blog) => {
    blogService.create(blog)
      .then(res => {
        setMessage(`new blog created: ${blog.title} by ${blog.author}`)
        setBlogs(blogs.concat(res))
        setNewBlogToggle(false)
      })
      .catch(err => {
        console.error(err)
        setMessage('no blog was created')
      })
  }

  const blogServiceUpdate = (id, blog) => {
    blogService.update(id, blog)
      .then(res => {
        setMessage(`you liked ${res.title} by ${res.author}`)
        setBlogs(blogs.filter(b => b.id !== res.id).concat(res))
      })
      .catch(err => {
        setMessage('error updating likes')
        console.error(err)
      })
  }

  const blogServiceDelete = (blog) => {
    if (window.confirm(`do you want to delete ${blog.name} by ${blog.author}?`)) {
      blogService.deleteEntry(blog.id)
        .then(() => {
          setMessage(`${blog.title} by ${blog.author} has been deleted`)
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
        .catch(err => {
          setMessage(`error deleting blog ${blog.title} by ${blog.author}`)
          console.error(err)
        })
    }
  }

  const setUserMessage = (message, time) => {
    if (!time) time = 5000; // default timeout is 5sec
    setMessage(message)
    setTimeout(() => {setMessage(null)}, time)
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  // get all blogs 
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
      <Login setUser={setUser} setMessage={setUserMessage} />
    </div>
  )
  else return (
    <div>
      <Message message={message} />
      <span>{user.username} is logged in</span>
      <button onClick={logout}>logout</button>
      <br />
      <br />
      <Togglable buttonLabel='new blog' visible={newBlogToggle} setVisible={setNewBlogToggle}>
        <BlogForm blogServiceCreate={blogServiceCreate}/>
      </Togglable>
      <h2>blogs</h2>
      {blogs.sort((b1, b2) => b2.likes - b1.likes).map(blog => <Blog key={blog.id} blog={blog} blogServiceUpdate={blogServiceUpdate} blogServiceDelete={blogServiceDelete}/>)}
    </div>
  )
}

export default App