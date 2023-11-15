import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoadingProducts: true,
  products: [],
  activeProduct: null
}

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    onLoadProducts: (state, { payload = [] }) => {
      state.isLoadingProducts = false
      // state.products = payload
      payload.forEach(product => {
        const exists = state.products.some(dbProduct => dbProduct.id === product.id)
        if (!exists) state.products.push(product)
      })
    },
    onAddNewProduct: (state, { payload }) => {
      state.products.push(payload)
      console.log(payload)
      state.activeProduct = null
    },
    onSetActiveProduct: (state, { payload }) => {
      state.activeProduct = payload
    },
    onPullActiveProduct: (state) => {
      state.activeProduct = null
    },
    onUpdateProduct: (state, { payload }) => {
      state.products = state.products.map(product => product.id === payload.id ? payload : product)
      for (const key in payload) {
        state.activeProduct = {
          ...state.activeProduct,
          [key]: payload[key]
        }
      }
    },
    onDeleteProduct: (state, { payload }) => {
      state.products = state.products.map(product => product.id === payload.id ? payload : product)
      state.activeProduct = null
    }
  }
});

// Action creators are generated for each case redicer function
export const { onLoadProducts, onAddNewProduct, onSetActiveProduct, onDeleteProduct, onPullActiveProduct, onUpdateProduct } = productsSlice.actions;