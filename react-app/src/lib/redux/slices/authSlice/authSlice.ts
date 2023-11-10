/* Core */
import { createSlice } from '@reduxjs/toolkit'

/* Instruments */
import { authenticateAsync } from './thunks'

export interface CurrentUser {
    token: string
}

const initialState: AuthSliceState = {
    isAuthenticated: false,
    status: 'idle',
    currentUser: {} as CurrentUser,
    errorMessage: null
}


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutAsync: (state) => {
            state.isAuthenticated = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(authenticateAsync.rejected, (state, action) => {
                state.status = 'loading'
                const { message } = { message: null, ...action };
                state.errorMessage =  message;
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
    currentUser: object,
    errorMessage: string | null
}
