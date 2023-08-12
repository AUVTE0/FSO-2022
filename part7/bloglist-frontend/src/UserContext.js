import { createContext, useReducer, useContext } from 'react'

const UserContext = createContext(null)

export const userReducer = (user, action) => {
  switch(action.type){
  case 'set':
    window.localStorage.setItem('user', JSON.stringify(action.payload))
    return action.payload
  case 'logout':
    console.log('logout')
    window.localStorage.removeItem('user')
    return null
  default:
    return user
  }
}

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(userReducer, JSON.parse(window.localStorage.getItem('user')))

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}

export default UserContext