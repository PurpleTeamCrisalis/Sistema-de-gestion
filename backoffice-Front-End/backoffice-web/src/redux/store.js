import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { usersSlice } from './users/userSlice'
import { chargesSlice } from './charges/chargesSlice'
import { productsSlice } from './products'
import { servicesSlice } from './services'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  charges: chargesSlice.reducer,
  products: productsSlice.reducer,
  services: servicesSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer
})