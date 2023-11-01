import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingClients: true,
  clients: [],
  activeClient: null,
};

export const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    onLoadClients: (state, { payload = [] }) => {
      state.isLoadingClients = false;
      state.clients = payload;
      payload.forEach((client) => {
        const exists = state.clients.some(
          (dbClient) => dbClient.id === client.id
        );
        if (!exists) state.clients.push(client);
      });
    },
    onAddNewClient: (state, { payload }) => {
      state.clients.push(payload);
    },
    onSetActiveClient: (state, { payload }) => {
      state.activeClient = payload;
    },
    onPullActiveClient: (state) => {
      state.activeClient = null;
    },
    onUpdateClient: (state, { payload }) => {
      state.clients = state.clients.map((clients) =>
        clients.id === payload.id ? payload : clients
      );
      for (const key in payload) {
        state.activeClient = {
          ...state.activeClient,
          [key]: payload[key],
        };
      }
      state.activeClient = null
    },
    onDeleteClient: (state) => {
      state.clients = state.clients.filter(
        (clients) => clients.id !== state.activeClient.id
      );
      state.activeClient = null;
    },
  },
});

// Action creators are generated for each case redicer function
export const {
  onLoadClients,
  onAddNewClient,
  onDeleteClient,
  onUpdateClient,
  onSetActiveClient,
  onPullActiveClient,
} = clientsSlice.actions;
