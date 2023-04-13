// import loginService from './service/loginService'
import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <form onSubmit={e => {
      setUsername('')
      setPassword('')
      handleLogin(e)
    }}>
      <div>
        <h1>log in to application</h1>
            username
        <input
          id='username'
          type='text'
          value={username}
          name='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
        <br/>
            password
        <input
          id='password'
          type='text'
          value={password}
          name='Password'
          onChange={({ target }) => setPassword(target.value)}
        /><br/>
        <button
          id = 'login-button'
          type='submit'>
            login
        </button>
      </div>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm