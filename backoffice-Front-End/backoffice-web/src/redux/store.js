import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { ordersSlice } from './orders/ordersSlice'
import { newOrderSlice } from './newOrder/newOrderSlice'
import { authSlice } from "./auth/authSlice";
import { userSlice } from "./users/usersSlice";
import { clientsSlice } from "./client/clientsSlice";
import { chargesSlice } from './charges/chargesSlice'
import { productsSlice } from './products';
import { servicesSlice } from './services';
import { suscriptionsSlice } from './suscriptions';

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  orders: ordersSlice.reducer,
  newOrder: newOrderSlice.reducer,
  users: userSlice.reducer,
  clients: clientsSlice.reducer,
  charges: chargesSlice.reducer,
  products: productsSlice.reducer,
  services: servicesSlice.reducer,
  suscriptions: suscriptionsSlice.reducer,
})


export const store = configureStore({
  reducer: rootReducer,
});
