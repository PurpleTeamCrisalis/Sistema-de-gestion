import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingOrdersHistory: true,
  ordersHistory: [],
  activeOrdersHistory: null,
};

export const ordersHistorySlice = createSlice({
  name: "ordersHistory",
  initialState,
  reducers: {
    onLoadOrdersHistory: (state, { payload = [] }) => {
      state.isLoadingOrdersHistory = false;
      state.ordersHistory = payload;
    },
    onSetActiveOrdersHistory: (state, { payload }) => {
      state.activeOrdersHistory = payload;
    },
    onPullActiveOrdersHistory: (state) => {
      state.activeOrdersHistory = null;
    },
  },
});

export const {
  onLoadOrdersHistory,
  onSetActiveOrdersHistory,
  onPullActiveOrdersHistory,
} = ordersHistorySlice.actions;