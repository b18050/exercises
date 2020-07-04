import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import SimpleBlog from './SimpleBlog'

test('renders title and author initially', () => {
  const blog = {
    title: 'My test should pass',
    author: 'Despascito',
    likes: '100',
    url: 'www.mytest.com'
  }

  const mockUser = {
    username: 'username',
    name: 'Name'
  }

  const component = render(
    <Blog blog={blog}  handleRemove ={() => {}} handleLikes ={() => {}} user = {mockUser}   />
  )

  // component.debug()

  // const div = component.container.querySelector('div')

  // console.log(prettyDOM(div))

  expect(component.container).toHaveTextContent(
    'My test should pass'
  )
})

test('clicking the show details button show url and likes', () => {
  const blog = {
    title: 'My test should pass',
    author: 'Despascito',
    likes: '100',
    url: 'www.mytest.com'
  }

  const mockHandler = jest.fn()

  const mockUser = {
    username: 'username',
    name: 'Name'
  }

  const component = render(
    <Blog blog={blog}  handleRemove ={() => {}} handleLikes ={() => {}} user = {mockUser}   />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'www.mytest.com'
  )
})

test('clicking like button 2 times call event handler 2 times', () => {

  const blog = {
    title: 'My test should pass',
    author: 'Despascito',
    likes: '100',
    url: 'www.mytest.com'
  }

  const mockHandler = jest.fn()



  const component = render(
    <SimpleBlog blog={blog}  onClick={mockHandler}   />
  )

  const button = component.container.querySelector('.blog-like')


  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})