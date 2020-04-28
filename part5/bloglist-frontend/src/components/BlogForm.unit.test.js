import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from'./BlogForm'

test('new blog event handler works correctly', () => {
  const blog = {
    title: 'Blog',
    author: 'Saul Goodman',
    url: 'abc123.com'
  }
  const mockHandler = jest.fn()

  const component = render(
    <BlogForm blogServiceCreate={mockHandler} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: blog.title }
  })
  fireEvent.change(author, {
    target: { value: blog.author }
  })
  fireEvent.change(url, {
    target: { value: blog.url }
  })
  fireEvent.submit(form)

  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('Blog')
  expect(mockHandler.mock.calls[0][0].author).toBe('Saul Goodman')
  expect(mockHandler.mock.calls[0][0].url).toBe('abc123.com')
})
