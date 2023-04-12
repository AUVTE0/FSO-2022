import { useState } from "react"
import blogService from '../services/blogs'

const Blog = ({b}) => {
  console.log(b)
  const [visible, setVisible] = useState(false)
  const [blog, setBlog] = useState(b)
  
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
  const handleLike = async () => {
    // console.log(blog)
    // console.log(blog.likes)
    try{
      const postBlog = {...blog, 
        user: blog.user.id,
        likes: blog.likes+1}
      // console.log(updatedBlog)
      const result = await blogService.update(postBlog)
      if(result){
        setBlog({...blog, likes: postBlog.likes})
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
      <button onClick={toggleVisible}>{visible? 'hide':'view'}</button>
      <div style={showWhenVisible}>
        {blog.url} <br/>
        likes {blog.likes} 
        <button onClick={handleLike}>like</button><br/>
        {blog.user? blog.user.name: null}
      </div>
    </div>  
  )
}

export default Blog