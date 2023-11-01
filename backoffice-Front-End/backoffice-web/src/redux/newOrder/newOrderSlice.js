import { createSlice } from '@reduxjs/toolkit'
import { Order } from "../../components/NewElementComponents/NewOrder/Item.js"

const initialState = {
  newOrder: {
    client: {
      id:1,
      name:"Seleccione un nombre"
    },
    products: [],
    services: []
  }
}

export const newOrderSlice = createSlice({
  name: 'newOrder',
  initialState,
  reducers: {
    onAddClient: (state, {payload}) => {
      state.newOrder.client = payload;
    },
    onAddProducts: (state, {payload}) => {
      payload.forEach((product)=>{
        const exists = state.newOrder.products.some(p => p.id === product.id)
        if(!exists)
          state.newOrder.products.push(product);
      })
    },
    onAddServices: (state, {payload}) => {
      payload.forEach((service)=>{
        const exists = state.newOrder.services.some(s => s.id === service.id)
        if(!exists)
          state.newOrder.services.push(service);
      })
    },
    onDelete: (state, {productIdSet, serviceIdSet}) => {
      state.newOrder.products = state.newOrder.products.filter(
        product => ! productIdSet.has(product.id)
      );
      state.newOrder.services = state.newOrder.services.filter(
        service => serviceIdSet.has(service.id)
      );
    }
  }
});

export const { onNewOrder, onAddClient, onAddProducts, onAddServices, onDelete } = newOrderSlice.actions;