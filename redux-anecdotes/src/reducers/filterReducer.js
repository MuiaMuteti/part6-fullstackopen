import { createSlice } from '@reduxjs/toolkit'

const noteSlice = createSlice({
    name: 'filter',
    initialState: '',
    reducers: {
        setFilter(state, action) {
            return action.payload
        }
    }
})

export const { setFilter } = noteSlice.actions
export default noteSlice.reducer