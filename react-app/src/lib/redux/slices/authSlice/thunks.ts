/* Instruments */
import { createAppAsyncThunk } from '@/lib/redux/createAppAsyncThunk'
import { postCredentials } from './postCredentials'

export interface Credentials {
    username: string;
    password: string;
}

export const authenticateAsync = createAppAsyncThunk(
    'auth/authenticate',
    async (credentials: Credentials) => {
        return postCredentials(credentials);
    }
)
