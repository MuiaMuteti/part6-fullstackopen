import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        putNotification(state, action) {
            return action.payload
        },
        clearNotification(state, action) {
            return null
        }
    }
})

const { putNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, duration) => {
    return (disch) => {
        disch(putNotification(notification))
        setTimeout(() => {
            disch(clearNotification())
        }, duration * 1000)
    }
}
export default notificationSlice.reducer