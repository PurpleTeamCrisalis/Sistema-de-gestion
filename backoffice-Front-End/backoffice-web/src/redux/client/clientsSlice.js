import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingClients: true,
  clients: [],
  activeClient: null,
  clientSubscriptions: [],
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
    onLoadClientSubscriptions: (state, { payload = [] }) => {
      state.isLoadingClients = false;
      state.clientSubscriptions = payload;
    },
    onDeleteCLientSubscriptions: (state) => {
      state.clientSubscriptions = [];
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
    },
    onDeleteClient: (state) => {
      state.clients = state.clients.filter(
        (clients) => clients.id !== state.activeClient.id
      );
      state.activeClient = null;
    },
    onChangeClientSubscriptionState: (state, {payload}) => {
      state.clients = state.clients.map(client => client.id === payload.id ? payload : client);
      state.activeClient = {...state.activeClient, ['subscriptionByServices']: payload.subscriptionByServices};
    }
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
  onLoadClientSubscriptions,
  onDeleteClientSubcriptions,
  onChangeClientSubscriptionState,
} = clientsSlice.actions;
