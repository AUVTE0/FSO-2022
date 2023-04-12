import { useState } from "react"

const Blog = ({blog}) => {
  console.log(blog)
  const [visible, setVisible] = useState(false)
  const toggleVisible = () => setVisible(!visible)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const showWhenVisible = {
    display: visible? '': 'none'
  }
  
  return(
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleVisible}>{visible? 'hide':'view'}</button>
      <div style={showWhenVisible}>
        {blog.url} <br/>
        likes {blog.likes} <br/>
        {blog.user? blog.user.name: null}
      </div>
    </div>  
  )
}

export default Blog