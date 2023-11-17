/* Instruments */
import type { ReduxState } from '@/lib/redux'
import type { CurrentUser} from "@/lib/redux";

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectAll = (state: ReduxState) => state.auth
export const selectErrorMessage = (state: ReduxState) => state.auth.errorMessage
export const selectIsAuthenticated = (state: ReduxState) => state.auth.isAuthenticated
