import React from 'react'
import FullBlog from './FullBlog'

const Blog = ({ blog }) => {
  return(
    <div className='blog-container'>
      <div>
        <FullBlog blog={blog} />
      </div>
    </div>
  )
}
export default Blog