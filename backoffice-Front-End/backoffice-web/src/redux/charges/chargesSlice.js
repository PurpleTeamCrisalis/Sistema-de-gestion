import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoadingCharges: true,
  charges: [],
  activeCharge: null
}

export const chargesSlice = createSlice({
  name: 'charges',
  initialState,
  reducers: {
    onLoadCharges: (state, { payload = [] }) => {
      state.isLoadingCharges = false
      state.charges = payload
      payload.forEach(charge => {
        const exists = state.charges.some(dbCharge => dbCharge.id === charge.id)
        if (!exists) state.charges.push(charge)
      })
    },
    onAddNewCharge: (state, { payload }) => {
      state.charges.push(payload)
      state.activeCharge = null
    },
    onSetActiveCharge: (state, { payload }) => {
      state.activeCharge = payload
    },
    onPullActiveCharge: (state) => {
      state.activeCharge = null
    },
    onUpdateCharge: (state, { payload }) => {
      state.charges = state.charges.map(charge => charge.id === payload.id ? payload : charge)
      for (const key in payload) {
        state.activeCharge = {
          ...state.activeCharge,
          [key]: payload[key]
        }
      }
    },
    onDeleteCharge: (state) => {
      state.charges = state.charges.filter(charge => charge.id !== state.activeCharge.id)
      state.activeCharge = null
    }
  }
});

// Action creators are generated for each case redicer function
export const { onLoadCharges, onAddNewCharge, onSetActiveCharge, onDeleteCharge, onPullActiveCharge, onUpdateCharge } = chargesSlice.actions;