import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { userSlice } from "./users/userSlice";
import { clientsSlice } from "./client/clientsSlice";
import { chargesSlice } from './charges/chargesSlice'
import { productsSlice } from './products'
import { servicesSlice } from './services'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: userSlice.reducer,
  clients: clientsSlice.reducer,
  charges: chargesSlice.reducer,
  products: productsSlice.reducer,
  services: servicesSlice.reducer,
})


export const store = configureStore({
  reducer: rootReducer,
});
