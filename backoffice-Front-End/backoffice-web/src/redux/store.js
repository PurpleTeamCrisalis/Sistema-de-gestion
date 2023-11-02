import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { authSlice } from './auth/authSlice'
import { ordersSlice } from './orders/ordersSlice'
import { newOrderSlice } from './newOrder/newOrderSlice'
import { usersSlice } from './users/usersSlice'
import { chargesSlice } from './charges/chargesSlice'
import { productsSlice } from './products'
import { servicesSlice } from './services'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  orders: ordersSlice.reducer,
  newOrder: newOrderSlice.reducer,
  charges: chargesSlice.reducer,
  products: productsSlice.reducer,
  services: servicesSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer
})