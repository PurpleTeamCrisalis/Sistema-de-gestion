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
          state.newOrder.products.push({ ...product, quantity: 1, warranty: 0, type: "Product" });
      })
    },
    onAddServices: (state, { payload }) => {
      payload.forEach((service) => {
        const exists = state.newOrder.services.some(s => s.id === service.id)
        if (!exists)
          state.newOrder.services.push({ ...service, type: "Service" });
      })
    },
    onSetActiveDetail: (state, { payload }) => {
      state.activeDetail = payload
    },
    onPullActiveDetail: (state) => {
      state.activeDetail = null
    },
    onUpdateQuantity: (state, { payload }) => {
      state.newOrder.products.forEach(product => {
        if (product.id === payload.detail.id) product.quantity = payload.quantity
      })
    },
    onUpdateWarranty: (state, { payload }) => {
      state.newOrder.products.forEach(product => {
        if (product.id === payload.detail.id) product.warranty = payload.warranty
      })
    },
    onDeleteDetail: (state) => {
      state.activeDetail.type === "Product"
        ? state.newOrder.products = state.newOrder.products.filter(product => product.id !== state.activeDetail.id)
        : state.newOrder.services = state.newOrder.services.filter(service => service.id !== state.activeDetail.id)
      state.activeDetail = null
    },
    onCleanNewOrder: (state) => {
      state.activeDetail = initialState.activeDetail
      state.newOrder = initialState.newOrder
    }
  }
});

export const { onNewOrder, onAddClient, onAddProducts, onAddServices, onDeleteDetail, onSetActiveDetail, onPullActiveDetail, onUpdateQuantity, onUpdateWarranty, onCleanNewOrder } = newOrderSlice.actions;