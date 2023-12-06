import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoadingServices: true,
  services: [],
  activeService: null
}

export const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    onLoadServices: (state, { payload = [] }) => {
      state.isLoadingServices = false
      // state.services = payload
      payload.forEach(service => {
        const exists = state.services.some(dbService => dbService.id === service.id)
        if (!exists) state.services.push(service)
      })
    },
    onAddNewService: (state, { payload }) => {
      state.services.push(payload)
      state.activeService = null
    },
    onSetActiveService: (state, { payload }) => {
      state.activeService = payload
    },
    onPullActiveService: (state) => {
      state.activeService = null
    },
    onUpdateService: (state, { payload }) => {
      state.services = state.services.map(service => service.id === payload.id ? payload : service)
      for (const key in payload) {
        state.activeService = {
          ...state.activeService,
          [key]: payload[key]
        }
      }
    },
    onDeleteService: (state, {payload}) => {
      state.services = state.services.map(service => service.id === payload.id ? payload : service)
      state.activeService = null
    }
  }
});

// Action creators are generated for each case redicer function
export const { onLoadServices, onAddNewService, onSetActiveService, onDeleteService, onPullActiveService, onUpdateService } = servicesSlice.actions;