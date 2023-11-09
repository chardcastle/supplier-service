/* Instruments */
import { counterSlice, authSlice } from './slices'

export const reducer = {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
}
