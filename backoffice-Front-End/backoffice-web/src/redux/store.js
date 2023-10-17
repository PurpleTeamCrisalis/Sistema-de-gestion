import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { usersSlice } from './users/usersSlice'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
})