import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  status: localStorage.getItem('token') ? 'authenticated' : 'not-authenticated',  // 'checking' || 'authenticated' || 'not-authenticated'
  user: {},
  errorMessage: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onChecking: (state) => {
      state.status = 'checking'
    },
    onLogin: (state, { payload }) => {
      state.status = 'authenticated'
      state.user = payload
    },
    onLogout: (state, { payload }) => {
      state.status = 'not-authenticated'
      state.user = {}
      state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = null
    },
    onChangeAuthUsername: (state, { payload }) => {
      state.user = {
        ...state.user,
        username: payload
      }
    }
  }
});

// Action creators are generated for each case redicer function
export const { onChecking, onLogin, onLogout, clearErrorMessage, onChangeAuthUsername } = authSlice.actions;