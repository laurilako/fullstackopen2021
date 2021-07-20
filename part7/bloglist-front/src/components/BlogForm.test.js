import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm /> component', () => {

  test('<BlogForm /> calls its handling func as new blog is created', () => {
    const createBlogPost = jest.fn()

    const component = render(
      <BlogForm createBlogPost={createBlogPost}/>
    )

    const authInput = component.container.querySelector('#author')
    const titleInput = component.container.querySelector('#title')
    const urlInput = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(authInput, {
        target: { value: 'Testaaja'}
    })
    fireEvent.change(titleInput, {
        target: { value: 'Otsikko'}
    })
    fireEvent.change(urlInput, {
        target: { value: 'testitesti.fi'}
    })
    fireEvent.submit(form)

    expect(createBlogPost.mock.calls.length).toBe(1)
    expect(createBlogPost.mock.calls[0][0].title).toBe('Otsikko')
  })
})

