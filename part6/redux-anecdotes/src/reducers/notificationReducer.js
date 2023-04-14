import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers:{
        setMessage(state, action) {
            console.log(action.payload)
            return action.payload
        },
        removeMessage(state, action) {
            return null
        }
    }
})

export const { setMessage, removeMessage } = notificationSlice.actions
export default notificationSlice.reducer