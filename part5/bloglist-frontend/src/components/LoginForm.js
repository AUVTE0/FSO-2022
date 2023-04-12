// import loginService from './service/loginService'
import { useState, useEffect } from 'react'


const LoginForm = ({handleLogin}) => {
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
            type='text' 
            value={username} 
            name='Username'
            onChange={({target}) => setUsername(target.value)}
            />
            <br/>
            password
            <input
            type='text'
            value={password}
            name='Password'
            onChange={({target}) => setPassword(target.value)}
            /><br/>
            <button type='submit'>login</button>
        </div>
    </form>
    )
}

export default LoginForm