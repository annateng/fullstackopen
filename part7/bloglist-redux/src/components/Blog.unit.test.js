import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from'./Blog'

/*************************************
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  blogServiceUpdate: PropTypes.func.isRequired,
  blogServiceDelete: PropTypes.func.isRequired
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

  const component = render(
    <Blog blog={blog} blogServiceUpdate={mockHandler} blogServiceDelete={mockHandler} />
  )

  expect(component.container).toHaveTextContent('My Test Blog Post')
  expect(component.container).toHaveTextContent('Stormy Daniel')
  expect(component.container).not.toHaveTextContent('www.myspace.org')
  expect(component.container).not.toHaveTextContent('5')
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

  const component = render(
    <Blog blog={blog} blogServiceUpdate={mockHandler} blogServiceDelete={mockHandler} />
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
  const mockUpdate = jest.fn()
  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} blogServiceUpdate={mockUpdate} blogServiceDelete={mockHandler} />
  )

  const button = component.getByText('show')
  fireEvent.click(button)
  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockUpdate.mock.calls).toHaveLength(2)
})

