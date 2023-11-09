/* Core */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

/* Instruments */
import { authenticateAsync } from './thunks'

const initialState: AuthSliceState = {
    isAuthenticated: false,
    status: 'idle',
    currentUser: {}
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(authenticateAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(authenticateAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                state.isAuthenticated = true
                state.currentUser = action.payload
            })
    },
})

/* Types */
export interface AuthSliceState {
    isAuthenticated: boolean
    status: 'idle' | 'loading' | 'failed',
    currentUser: object
}
