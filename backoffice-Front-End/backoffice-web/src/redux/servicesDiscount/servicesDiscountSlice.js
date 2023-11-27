import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingServicesDiscount: true,
  servicesDiscount: [],
  activeServicesDiscount: null,
};

export const servicesDiscountSlice = createSlice({
  name: "servicesDiscount",
  initialState,
  reducers: {
    onLoadServicesDiscount: (state, { payload = [] }) => {
      state.isLoadingServicesDiscount = false;

      state.servicesDiscount = payload;
    },
    onSetActiveServicesDiscount: (state, { payload }) => {
      state.activeServicesDiscount = payload;
    },
    onPullActiveServicesDiscount: (state) => {
      state.activeServicesDiscount = null;
    },
  },
});

export const {
  onLoadServicesDiscount,
  onSetActiveServicesDiscount,
  onPullActiveServicesDiscount,
} = servicesDiscountSlice.actions;
