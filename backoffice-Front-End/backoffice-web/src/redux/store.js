import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { usersSlice } from './users/userSlice'
import { chargesSlice } from './charges/chargesSlice'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  charges: chargesSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer
})