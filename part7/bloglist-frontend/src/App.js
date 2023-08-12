import { useReducer, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import loginService from './services/loginService'
import Togglable from './components/Togglable'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { userReducer, UserContextProvider } from './UserContext'

const notificationReducer = (message, action) => {
  switch(action.type){
  case 'set':
    return action.payload? action.payload: null
  case 'unset':
    return null
  default:
    return message
  }
}

const App = () => {
  const queryClient = useQueryClient()
  const [message, messageDispatch] = useReducer(notificationReducer, null)
  const [user, userDispatch] = useReducer(userReducer, JSON.parse(window.localStorage.getItem('user')))
  blogService.setToken(user.token)

  // queries
  const { data: blogs, isLoading } = useQuery('blogs', blogService.getAll)
  const blogFormRef = useRef()

  const notify = ([message, isError]) => {
    messageDispatch({ type: 'set', payload: [ message, isError] })
    setTimeout(() => { messageDispatch({ type: 'unset' }) }, 5000)
  }

  // mutations
  const createBlog = useMutation(blogService.create, {
    onSuccess: (blog) => {
      queryClient.invalidateQueries('blogs')
      notify([`${blog.title} by ${blog.author} added!`, false])
    },
    onError: (e) => {
      notify([
        `Blog creation failed with error: ${e.response.data.error}`,
        true,
      ])
    }
  })

  const deleteBlog = useMutation(blogService.remove, {
    onSuccess: (blog) => {
      queryClient.invalidateQueries('blogs')
      console.log('removed blog')
      console.log(blog)
      notify([`${blog.title} by ${blog.author} removed!`, false])
    },
    onError: (e) => {
      console.log(e.message)
      notify([
        `Blog deletion failed with error: ${e.response.data.error}`,
        true,
      ])
    }
  })

  const updateBlog = useMutation(blogService.update, {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
    onError: (e) => {
      console.log(e.message)
    }
  })

  if(isLoading){
    return(<div>loading...</div>)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    const username = e.target.Username.value
    const password = e.target.Password.value
    try {
      const loggedUser = await loginService.login({ username, password })
      userDispatch({ type: 'set', payload: loggedUser })
      blogService.setToken(user.token)
    }
    catch(e) {
      console.log(e.message)
      notify([
        'incorrect username or password',
        true,
      ])
    }
  }

  const handleLogout = () => {
    userDispatch({ type: 'logout' })
    blogService.setToken(null)
  }

  const handleBlogCreate = async (e) => {
    e.preventDefault()
    blogFormRef.current.toggleVisible()

    const blog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    }
    createBlog.mutate(blog)
  }

  const handleRemove = async (id) => {
    console.log(id)
    const blog = blogs.find((b) => b.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteBlog.mutate(blog)
    }
  }

  const handleLike = async (id) => {
    console.log(id)
    const blog = blogs.find((b) => b.id === id)
    const postBlog = { ...blog, user: blog.user.id, likes: blog.likes + 1 }
    updateBlog.mutate(postBlog)
  }

  console.log('user is')
  console.log(user)
  if (false || !user) {
    return (
      <div>
        <Notification message={message} />
        <LoginForm handleLogin={handleLogin} />
      </div>
    )
  } else {
    return (
      <UserContextProvider>
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
      </UserContextProvider>
    )
  }
}

export default App
