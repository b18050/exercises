import React from 'react'

import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> updates author name and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )


  const author = component.container.querySelector('#newauthor')
  const form = component.container.querySelector('form')

  fireEvent.change(author, {
    target: { value: 'nameofauthor' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].author).toBe('nameofauthor')
})