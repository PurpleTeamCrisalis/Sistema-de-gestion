import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  counter: 1
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    increment: (state) => {
      state.counter = state.counter + 1
    }
  }
});

// Action creators are generated for each case redicer function
export const { increment } = usersSlice.actions;