import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import loginService from './services/loginService'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('user'))
    if (loggedUser) {
      setUser(loggedUser)
      console.log(loggedUser.token)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const username = e.target.Username.value
      const password = e.target.Password.value
      const loggedUser = await loginService.login({ username, password })
      if (loggedUser) {
        setUser(loggedUser)
        window.localStorage.setItem('user', JSON.stringify(loggedUser))
        blogService.setToken(loggedUser.token)
      }
    } catch (e) {
      console.log(e)
      setMessage([
        `incorrect username or password: ${e.response.data.error}`,
        true,
      ])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('user')
  }
  const handleBlogCreate = async (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisible()

    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    try {
      const createdBlog = await blogService.create(blog)

      if (createdBlog) {
        setBlogs(await blogService.getAll())
        setMessage([`${blog.title} by ${blog.author} added!`, false])
        setTimeout(() => setMessage(null), 5000)
      }
    } catch (e) {
      console.log(e)
      setMessage([
        `Blog creation failed with error: ${e.response.data.error}`,
        true,
      ])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  const handleRemove = async (id) => {
    try {
      console.log(id)
      const blog = blogs.find((b) => b.id === id)
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
        await blogService.remove(blog)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
        setMessage([`${blog.title} by ${blog.author} removed!`, false])
        setTimeout(() => setMessage(null), 5000)
      }
    } catch (e) {
      console.log(e.message)
      setMessage([
        `Blog deletion failed with error: ${e.response.data.error}`,
        true,
      ])
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (id) => {
    // console.log(blog)
    console.log(id)
    try {
      const blog = blogs.find((b) => b.id === id)
      console.log(blog)
      const postBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }

      const result = await blogService.update(postBlog)

      if (result) {
        const updatedBlog = { ...blog, likes: blog.likes + 1 }
        setBlogs(blogs.map((b) => (b.id !== blog.id ? b : updatedBlog)))
      }
      console.log(result)
    } catch (e) {
      console.log(e.message)
    }
  }

  if (false || !user) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  } else {
    return (
      <div>
        <h1>blogs</h1>
        <Notification message={message} />
        {user.name} logged in
        <button onClick={handleLogout}>logout</button>
        <Togglable showButtonText="new blog" ref={blogFormRef}>
          <BlogForm handleBlogCreate={handleBlogCreate} />
        </Togglable>
        <br />
        <br />
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog, i) => (
            <Blog
              key={i}
              index={i}
              blog={blog}
              handleRemove={() => handleRemove(blog.id)}
              handleLike={() => handleLike(blog.id)}
            />
          ))}
      </div>
    )
  }
}

export default App
