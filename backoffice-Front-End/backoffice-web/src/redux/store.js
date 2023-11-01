import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { usersSlice } from './users/usersSlice'
import { ordersSlice } from './orders/ordersSlice'
import { newOrderSlice } from './newOrder/newOrderSlice'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  orders: ordersSlice.reducer,
  newOrder: newOrderSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
})