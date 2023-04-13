import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleRemove, handleLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleShow = () => setShowDetails(!showDetails)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = {
    display: showDetails? '': 'none'
  }
  const loggedUser = JSON.parse(window.localStorage.getItem('user'))

  const isByLoggedUser = loggedUser && blog.user && loggedUser.username === blog.user.username
  const showDelete = {
    display: isByLoggedUser? '': 'none'
  }

  return(
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author}
      <button id='toggle-view-button' onClick={toggleShow}>{showDetails? 'hide':'view'}</button>
      <div style={showWhenVisible}>
        {blog.url} <br/>
        likes {blog.likes}
        <button id='like-button' onClick={handleLike}>like</button><br/>
        {blog.user? blog.user.name: null} <br/>
        <button id='remove-button' onClick={handleRemove} style={showDelete}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog