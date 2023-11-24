import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoadingOrders: true,
  orders: [],
  activeOrder: null,
  selectedOrder: null,
  clientOrders: []
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
    onLoadClientOrders: (state, { payload = [] }) => {
      state.isLoadingOrders = false;
      state.clientOrders = payload;
    },
    onDeleteCLientOrders: (state) => {
      state.clientOrders = [];
    },
    onSetSelectedOrder: (state, { payload }) => {
      state.selectedOrder = payload
    },
    onPullSelectedOrder: (state) => {
      state.selectedOrder = null
    },
    onAddNewOrder: (state, { payload }) => {
      const exists = state.orders.some(dbOrder => dbOrder.id === payload.id)
      if (!exists) {
        state.orders.push(payload)
        state.activeOrder = null
      }
    },
    onSetActiveOrder: (state, { payload }) => {
      state.activeOrder = payload
    },
    onPullActiveOrder: (state) => {
      state.activeOrder = null
    },
    onChangeOrderState: (state, { payload }) => {
      state.orders = state.orders.map(order => order.id === payload.id ? payload : order)
    }
  }
});

export const {
  onLoadOrders,
  onAddNewOrder,
  onSetActiveOrder,
  onPullActiveOrder,
  onUpdateOrder,
  onSetSelectedOrder,
  onPullSelectedOrder,
  onLoadClientOrders,
  onDeleteCLientOrders,
  onChangeOrderState
} = ordersSlice.actions;
