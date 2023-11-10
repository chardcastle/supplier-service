/* Core */
import { createSlice } from '@reduxjs/toolkit'

/* Instruments */
import { authenticateAsync } from './thunks'

export interface CurrentUser {
    token: string
}

interface LoginResponse {
    token: string | undefined,
    message: string | undefined
}

interface ApiSuccess {
    success: boolean,
    status: number,
    data: LoginResponse
}

const initialState: AuthSliceState = {
    isAuthenticated: false,
    status: 'idle',
    currentUser: {} as CurrentUser,
    errorMessage: undefined
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logoutAsync: (state) => {
            state.isAuthenticated = false
            localStorage.removeItem('token')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(authenticateAsync.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(authenticateAsync.rejected, (state, action) => {
                state.status = 'loading'
                const { message } = { message: null, ...action }
                state.errorMessage = message
            })
            .addCase(authenticateAsync.fulfilled, (state, action) => {
                state.status = 'idle'
                const payload = action.payload as ApiSuccess
                console.log("Payload", payload)
                const defaults = { data: { token: undefined, message: undefined } }
                const { success, data: { token, message }} = { ...defaults, ...payload };
                console.log("Response", { success, token, message });
                state.isAuthenticated = success
                state.errorMessage = message || null
                const authToken = token || false
                if (authToken) {
                    localStorage.setItem('token', authToken);
                }
            })
    },
})

/* Types */
export interface AuthSliceState {
    isAuthenticated: boolean
    status: 'idle' | 'loading' | 'failed',
    currentUser: object,
    errorMessage: string | null | undefined
}
