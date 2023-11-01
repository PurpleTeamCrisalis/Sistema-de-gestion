import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoadingOrders: true,
  orders: [],
  activeOrder: null,
}

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {   
    onLoadOrders: (state, { payload = [] }) => {
      state.isLoadingOrders = false;
      payload.forEach(order => {
        const exists = state.orders.some(dbOrder => dbOrder.id === order.id)
        if (!exists) state.orders.push(order)
      })
    },
    onAddNewOrder: (state, { payload }) => {
      const exists = state.orders.some(dbOrder => dbOrder.id === payload.id)
      if (!exists) 
      {
        state.orders.push(payload)
        state.activeOrder = null
      }
    },
    onSetActiveOrder: (state, { payload }) => {
      state.activeOrder = payload
    },
    onPullActiveOrder: (state) => {
      state.activeOrder = null
    }
  }
});

export const { onLoadOrders, onAddNewOrder, onSetActiveOrder, onPullActiveOrder, onUpdateOrder } = ordersSlice.actions;