import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { usersSlice } from "./users/usersSlice";
import { clientsSlice } from "./client/clientsSlice";
import { chargesSlice } from './charges/chargesSlice'

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  users: usersSlice.reducer,
  clients: clientsSlice.reducer,
  charges: chargesSlice.reducer,
})


export const store = configureStore({
  reducer: rootReducer,
});
