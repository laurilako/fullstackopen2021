import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

describe('<Blog /> component', () => {
    const mockBlogUpdate = jest.fn()
    let component
    beforeEach(() => {
      const user = {
        name: 'Tero Testaaja',
        username: 'testotero',
      }
  
      const blog = {
        author: 'kirjoittaja',
        likes: 1,
        title: 'otsake',
        url: 'osoite.com',
        user: {
          username: 'testotero'
        }
      }
      component = render(
        <Blog blog={blog} currUser={user} blogUpdate={mockBlogUpdate}/>
      )
    })

  test('shows the blog title and author, but not the other details', () => {
    const titleandauthor = component.container.querySelector('.blog-title-author')
    expect(titleandauthor).toHaveTextContent('otsake, written by kirjoittaja')
    const fullblog = component.container.querySelector('.blog-full')
    expect(fullblog).toBe(null)
  })

  test('shows full details after clicking view button', () => {
    let button = component.getByText('view')
    fireEvent.click(button)
    const div = component.container.querySelector('.blog-full')
    expect(div).toHaveTextContent('osoite.comLikes: 1 likeAdded by: remove')
  })
  test('pressing like button twice calls its handler twice', () => {
    let viewbutton = component.getByText('view')
    fireEvent.click(viewbutton)
    
    let likebutton = component.getByText('like')
    fireEvent.click(likebutton)
    fireEvent.click(likebutton)
    expect(mockBlogUpdate).toBeCalledTimes(2)
  })
})