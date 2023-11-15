/* Instruments */
import { counterSlice, authSlice } from './slices'
import { suppliersApi } from '@/lib/redux/services/suppliersApi';

export const reducer = {
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
    [suppliersApi.reducerPath]: suppliersApi.reducer,
}
