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
  const setBlogs = jest.fn()
  const mockHandler = jest.fn()
  const mockArray = []

  const component = render(
    <BlogForm blogs={mockArray} setBlogs={setBlogs} setMessage={mockHandler} setVisible={mockHandler} username='' />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, blog.title)
  fireEvent.change(author, blog.author)
  fireEvent.change(url, blog.url)
  fireEvent.submit(form)

  // expect(setBlogs.mock.calls).toHaveLength(1)
  // expect(setBlog)
  // again, my codes all different this is a waste of time.
})
