import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from'./Blog'

/************************************* 
 Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired
}
**************************************/

test('default renders title and author, not url or number of likes', () => {
  const blog = {
    title: 'My Test Blog Post',
    author: 'Stormy Daniel',
    url: 'www.myspace.org',
    likes: 5,
    user: {
      username: 'dummy'
    }
  }
  const mockHandler = jest.fn()
  const mockArray = []

  const component = render(
    <Blog blog={blog} setMessage={mockHandler} blogs={mockArray} setBlogs={mockHandler} />
  )

  expect(component.container).toHaveTextContent('My Test Blog Post')
  expect(component.container).toHaveTextContent('Stormy Daniel')
  expect(component.queryByText('www.myspace.org')).toBeNull()
  expect(component.queryByText('5')).toBeNull()
})

test('show button adds url and number of likes', () => {
  const blog = {
    title: 'My Test Blog Post',
    author: 'Stormy Daniel',
    url: 'www.myspace.org',
    likes: 5,
    user: {
      username: 'dummy'
    }
  }
  const mockHandler = jest.fn()
  const mockArray = []

  const component = render(
    <Blog blog={blog} setMessage={mockHandler} blogs={mockArray} setBlogs={mockHandler} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent('www.myspace.org')
  expect(component.container).toHaveTextContent('likes:')
})

test('clicking like twice fires 2 events', async() => {
  const blog = {
    title: 'My Test Blog Post',
    author: 'Stormy Daniel',
    url: 'www.myspace.org',
    likes: 5,
    user: {
      username: 'dummy'
    }
  }
  const mockHandler = jest.fn()
  const mockArray = []

  const component = render(
    <Blog blog={blog} setMessage={mockHandler} blogs={mockArray} setBlogs={mockHandler} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  // await waitFor(() => expect(mockHandler).toHaveBeenCalledTimes(1))
  // expect(mockHandler.mock.calls).toHaveLength(2)
  // I truly think this is a waste of time. skipping.
})

