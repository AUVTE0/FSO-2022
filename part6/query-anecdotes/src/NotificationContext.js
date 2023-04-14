import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
    switch(action.type){
        case 'SET':
            return action.payload
        case 'REMOVE':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [ message, messageDispatch ] = useReducer(notificationReducer, null)

    return (
        <NotificationContext.Provider value={[message, messageDispatch]}>
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useMessageValue = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[0]
}
export const useMessageDispatch = () => {
    const messageAndDispatch = useContext(NotificationContext)
    return messageAndDispatch[1]
}

export const setNotification = () => {
    return async (message, timeout) => {
        const messageDispatch = useMessageDispatch()
        messageDispatch({
            action: 'SET',
            payload: message
        })
        setTimeout(() => {
            messageDispatch({
                action: 'REMOVE'
            })
        }, timeout)
    }
}

export default NotificationContext