import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  newOrder: {
    client: {},
    products: [],
    services: []
  },
  activeDetail: null
}

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    onAddClient: (state, { payload }) => {
      state.newOrder.client = payload;
    },
    onAddProducts: (state, { payload }) => {
      payload.forEach((product) => {
        const exists = state.newOrder.products.some(p => p.id === product.id)
        if (!exists)
          state.newOrder.products.push({ ...product, quantity: 1 });
      })
    },
    onAddServices: (state, { payload }) => {
      payload.forEach((service) => {
        const exists = state.newOrder.services.some(s => s.id === service.id)
        if (!exists)
          state.newOrder.services.push({ ...service, quantity: 1 });
      })
    },
    onSetActiveDetail: (state, { payload }) => {
      state.activeDetail = payload
    },
    onPullActiveDetail: (state) => {
      state.activeDetail = null
    },
    onUpdateQuantity: (state, { payload }) => {
      payload.detail.type === "Product"
        ? state.newOrder.products.forEach(product => {
          if (product.id === payload.detail.id) product.quantity = payload.quantity
        })
        : state.newOrder.services.forEach(service => {
          if (service.id === payload.detail.id) service.quantity = payload.quantity
        })
    },
    onDeleteDetail: (state) => {
      state.activeDetail.type === "Product"
        ? state.newOrder.products = state.newOrder.products.filter(product => product.id !== state.activeDetail.id)
        : state.newOrder.services = state.newOrder.services.filter(service => service.id !== state.activeDetail.id)
      state.activeDetail = null
    }
  }
});

export const { onNewOrder, onAddClient, onAddProducts, onAddServices, onDeleteDetail, onSetActiveDetail, onPullActiveDetail, onUpdateQuantity } = newOrderSlice.actions;