import React, { useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { setMessage } from './reducers/messageReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { toggleNewBlog } from './reducers/displayReducer'

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const blogServiceCreate = (blog) => {
    blogService.create(blog)
      .then(res => {
        dispatch(setMessage(`new blog created: ${blog.title} by ${blog.author}`))
        dispatch(createBlog(res))
        dispatch(toggleNewBlog())
      })
      .catch(err => {
        console.error(err)
        dispatch(setMessage('no blog was created'))
      })
  }

  const blogServiceUpdate = (id, blog) => {
    blogService.update(id, blog)
      .then(res => {
        dispatch(setMessage(`you liked ${res.title} by ${res.author}`))
        dispatch(updateBlog(res))
      })
      .catch(err => {
        dispatch(setMessage('error updating likes'))
        console.error(err)
      })
  }

  const blogServiceDelete = (blog) => {
    if (window.confirm(`do you want to delete ${blog.name} by ${blog.author}?`)) {
      blogService.deleteEntry(blog.id)
        .then(() => {
          dispatch(setMessage(`${blog.title} by ${blog.author} has been deleted`))
          dispatch(deleteBlog(blog.id))
        })
        .catch(err => {
          dispatch(setMessage(`error deleting blog ${blog.title} by ${blog.author}`))
          console.error(err)
        })
    }
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    dispatch(clearUser())
  }

  const compareBlogs = (b1, b2) => {
    if (b1.likes === b2.likes) return b1.title < b2.title ? -1 : 1
    return b2.likes - b1.likes
  }

  // get all blogs
  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch])

  // check if user is already logged in
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('user')
    if (loggedUser) {
      const curUser = JSON.parse(loggedUser)
      dispatch(setUser(curUser))
      blogService.setToken(curUser.token)
    }
  }, [dispatch])

  if (!user.username) return (
    <div>
      <Message />
      <Login setUser={setUser} />
    </div>
  )
  else return (
    <div>
      <Message />
      <span>{user.username} is logged in</span>
      <button onClick={logout}>logout</button>
      <br />
      <br />
      <Togglable buttonLabel='new blog'>
        <BlogForm blogServiceCreate={blogServiceCreate}/>
      </Togglable>
      <h2>blogs</h2>
      {blogs.sort((b1, b2) => compareBlogs(b1, b2)).map(blog => <Blog key={blog.id} blog={blog} blogServiceUpdate={blogServiceUpdate} blogServiceDelete={blogServiceDelete}/>)}
    </div>
  )
}

export default App