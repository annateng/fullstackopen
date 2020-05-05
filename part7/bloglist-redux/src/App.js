import React, { useEffect } from 'react'
import Login from './components/Login'
import Message from './components/Message'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogDetail from './components/BlogDetail'
import { blogService } from './services/serviceMaker'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { setMessage } from './reducers/messageReducer'
import { setUser, clearUser } from './reducers/userReducer'
import { toggleNewBlog } from './reducers/displayReducer'
import { Switch, Route, useRouteMatch, Link } from 'react-router-dom'
import { Container, AppBar, Button, Toolbar, Typography, makeStyles } from '@material-ui/core'
import Blogs from './components/Blogs'

const useStyles = makeStyles(theme => ({
  button: {
    marginRight: theme.spacing(2)
  },
  appbar: {
    backgroundColor: 'lightslategrey',
    marginBottom: theme.spacing(3)
  },
  right: {
    marginLeft: 'auto'
  },
  typography: {
    color: 'black'
  }
}))

const App = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()
  const classes = useStyles()

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

  const updateLikes = blog => {

    const updatedBlog = {
      likes: blog.likes + 1
    }

    blogServiceUpdate(blog.id, updatedBlog)
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    dispatch(clearUser())
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

  const matchUser = useRouteMatch('/user/:id')
  const curUser = matchUser ? users.find(user => user.id === matchUser.params.id) : null

  const matchBlog = useRouteMatch('/blog/:id')
  const curBlogId = matchBlog ? matchBlog.params.id : null

  if (!user.username) return (
    <Container>
      <div>
        <Message />
        <Login setUser={setUser} />
      </div>
    </Container>
  )
  else return (
    <Container>
      <AppBar position='static' className={classes.appbar}>
        <Toolbar>
          <Button className={classes.button} component={Link} to='/'>blogs</Button>
          <Button className={classes.button} component={Link} to = '/users'>users</Button>
          <div className={classes.right}>
            <Typography variant='caption' className={classes.typography}>{user.username} is logged in</Typography>
            <Button onClick={logout}>logout</Button>
          </div>
        </Toolbar>
      </AppBar>
      <Message />
      <Switch>
        <Route path='/user/:id'>
          <User user={curUser} />
        </Route>
        <Route path='/blog/:id'>
          <BlogDetail blogId={curBlogId} updateLikes={updateLikes} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Togglable buttonLabel='new blog'>
            <BlogForm blogServiceCreate={blogServiceCreate}/>
          </Togglable>
          <Typography variant='h2'>blogs</Typography>
          <Blogs blogs={blogs} blogServiceDelete={blogServiceDelete} updateLikes={updateLikes}/>
        </Route>
      </Switch>
    </Container>
  )
}

export default App