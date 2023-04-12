import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import loginService from './services/loginService'
import Togglable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [isError, setError] = useState(false)

  const blogFormRef = useRef() 

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'))
    if(loggedUser){
      setUser(loggedUser)
      console.log(loggedUser.token)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const username = e.target.Username.value
      const password = e.target.Password.value
      const loggedUser = await loginService.login({username, password})
      if(loggedUser){
        setUser(loggedUser)
        
        window.localStorage.setItem('user', JSON.stringify(loggedUser))
        blogService.setToken(loggedUser.token)
      }
      
    }
    catch(e){
      console.log(e)
      setMessage([`incorrect username or password: ${e.response.data.error}`, true])
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }

  
  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('user')
  }
  const handleBlogCreate = async e => {
    e.preventDefault()
    blogFormRef.current.toggleVisible()
    
    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }
    try {
      const createdBlog = await blogService.create(blog)

      if(createdBlog){
        setBlogs(await blogService.getAll())
        setMessage([`${blog.title} by ${blog.author} added!`, false])
        setTimeout(() => setMessage(null), 5000)
      }
    }
    catch(e){
      console.log(e)
      setMessage([`Blog creation failed with error: ${e.response.data.error}`, true])
      setTimeout(() => { setMessage(null) }, 5000)
    }
    
  }
  const handleRemove = async blog => {
    try {
      if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
        const result = await blogService.remove(blog)
        setBlogs(blogs.filter(b => b.id !== blog.id))
        setMessage([`${blog.title} by ${blog.author} removed!`, false])
        setTimeout(() => setMessage(null), 5000)
      } 
    }
    catch(e) {
      console.log(e.message)
      setMessage([`Blog deletion failed with error: ${e.response.data.error}`, true])
      setTimeout(() => { setMessage(null) }, 5000)
    }
  }


  if (false || !user){
    return (
      <div>
        <Notification message={message} isError={isError}/>
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }
  else {
    return (
      <div>
        <h1>blogs</h1>
        <Notification message={message} isError={isError}/>
        {user.name} logged in 
        <button onClick={handleLogout}>logout</button>
        <Togglable showButtonText='new blog' ref={blogFormRef}>
          <BlogForm handleBlogCreate={handleBlogCreate}/>
        </Togglable>
        <br/>
        <br/>
        {blogs.sort((a,b)=> b.likes - a.likes).map(blog =>
          <Blog key={blog.id} b={blog} handleRemove={handleRemove}/>
        )}
      </div>
    )
  }    
}

export default App