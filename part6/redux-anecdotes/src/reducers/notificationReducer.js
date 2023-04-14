import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers:{
        setMessage(state, action) {
            return action.payload
        },
        removeMessage(state, action) {
            return null
        }
    }
})

export const { setMessage, removeMessage } = notificationSlice.actions

export const setNotification = (message, timeout) => {
    return dispatch => {
        dispatch(setMessage(message))
        setTimeout(() => dispatch(removeMessage()), timeout)
    }
}

export default notificationSlice.reducer