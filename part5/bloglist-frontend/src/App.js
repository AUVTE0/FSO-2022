import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/loginService'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async e => {
    e.preventDefault()
    try {
      const username = e.target.Username.value
      const password = e.target.Password.value
      const user = await loginService.login({username, password})
      if(user){
        console.log(user)
        setUser(user)
      }
      
    }
    catch(exception){
      console.log('error handling login')
    }


  }  
  if (!user){
    return (
      <div>
        <LoginForm handleLogin={handleLogin}/>
      </div>
    )
  }
  else {
    return (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }    
}

export default App