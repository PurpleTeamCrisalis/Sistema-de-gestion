import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoadingUsers: true,
  users: [],
  activeUser: null
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    onLoadUsers: (state, { payload = [] }) => {
      state.isLoadingUsers = false
      // state.users = payload
      payload.forEach(user => {
        const exists = state.users.some(dbUser => dbUser.id === user.id)
        if (!exists) state.users.push(user)
      })
    },
    onAddNewUser: (state, { payload }) => {
      state.users.push(payload)
      state.activeUser = null
    },
    onSetActiveUser: (state, { payload }) => {
      state.activeUser = payload
    },
    onPullActiveUser: (state) => {
      state.activeUser = null
    },
    onUpdateUser: (state, { payload }) => {
      state.users = state.users.map(user => user.id === payload.id ? payload : user)
      state.activeUser = null
    },
    onDeleteUser: (state) => {
      state.users = state.users.filter(user => user.id !== state.activeUser.id)
      state.activeUser = null
    }
  }
});

// Action creators are generated for each case redicer function
export const { onLoadUsers, onAddNewUser, onSetActiveUser, onDeleteUser, onPullActiveUser, onUpdateUser } = usersSlice.actions;