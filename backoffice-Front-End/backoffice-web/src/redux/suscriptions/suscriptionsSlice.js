import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoadingSuscriptions: true,
  suscriptions: [],
  activeSuscription: null,
  selectedSuscription: null,
  clientSuscriptions: []
}

export const suscriptionsSlice = createSlice({
  name: 'suscriptions',
  initialState,
  reducers: {   
    onLoadSuscriptions: (state, { payload = [] }) => {
      state.isLoadingSuscriptions = false;
      payload.forEach(suscription => {
        const exists = state.suscriptions.some(dbSuscription => dbSuscription.id === suscription.id)
        if (!exists) state.suscriptions.push(suscription)
      })
    },
    onLoadClientSuscriptions: (state, { payload = [] }) => {
      state.isLoadingSuscriptions = false;
      state.clientSuscriptions = payload;
    },
    onDeleteCLientSuscriptions: (state) => {
      state.clientSuscriptions = [];
    },
    onLoadSuscriptionById: (state, {payload}) => {
      state.selectedSuscription = payload
    },
    onAddNewSuscription: (state, { payload }) => {
      const exists = state.suscriptions.some(dbSuscription => dbSuscription.id === payload.id)
      if (!exists) 
      {
        state.suscriptions.push(payload)
        state.activeSuscription = null
      }
    },
    onUpdateSuscription: (state, { payload }) => {
        state.suscriptions = state.suscriptions.map((suscriptions) =>
          suscriptions.id === payload.id ? payload : suscriptions
        );
        for (const key in payload) {
          state.activeSuscription = {
            ...state.activeSuscription,
            [key]: payload[key],
          };
        }
      },
    onSetActiveSuscription: (state, { payload }) => {
      state.activeSuscription = payload
    },
    onPullActiveSuscription: (state) => {
      state.activeSuscription = null
    }
  }
});

export const { onLoadSuscriptions, onAddNewSuscription, onSetActiveSuscription, onPullActiveSuscription, onUpdateSuscription, onLoadSuscriptionById, onLoadClientSuscriptions, onDeleteCLientSuscriptions } = suscriptionsSlice.actions;