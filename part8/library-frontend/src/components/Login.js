import { useMutation } from '@apollo/client'
import { useState, useEffect } from 'react'
import { LOGIN } from '../mutations'

const Login = ({show, setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message)
      setError(messages)
    }
  });

  useEffect(() => {
    const token = result?.data?.login?.value;
    if(token){
      setToken(result.data.login.value);
      localStorage.setItem('library-user-token', token)
      setUsername('');
      setPassword('');
    }
  }, [result.data, setToken])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    setError(null);
    console.log('logging in...')
    login({ variables: {username, password }})
  }

  return (
    <div>
      {
        error && error?.map(e => (
          <div key={e} style={{color: 'red'}}>
            {e}
          </div>
        ))
      }
      <form onSubmit={submit}>
        <div>
          username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default Login