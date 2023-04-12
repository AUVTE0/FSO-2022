import { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ b, handleRemove }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [blog, setBlog] = useState(b)

  const toggleShow = () => setShowDetails(!showDetails)
  const handleRemoveClick = () => {
    handleRemove(blog)
  }
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

  const handleLike = async () => {
    // console.log(blog)
    // console.log(blog.likes)
    try{
      const postBlog = { ...blog,
        user: blog.user.id,
        likes: blog.likes+1 }
      // console.log(updatedBlog)
      const result = await blogService.update(postBlog)
      if(result){
        setBlog({ ...blog, likes: postBlog.likes })
      }
      console.log(result)
    }
    catch(e){
      console.log(e.message)
    }
  }

  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShow}>{showDetails? 'hide':'view'}</button>
      <div style={showWhenVisible}>
        {blog.url} <br/>
        likes {blog.likes}
        <button onClick={handleLike}>like</button><br/>
        {blog.user? blog.user.name: null} <br/>
        <button onClick={handleRemoveClick} style={showDelete}>remove</button>
      </div>
    </div>
  )
}

Blog.propTypes = {
  handleRemove: PropTypes.func.isRequired,
  b: PropTypes.object.isRequired
}

export default Blog