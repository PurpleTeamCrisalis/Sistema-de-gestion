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
      payload.forEach((sd) => {
        const exists = state.servicesDiscount.some((dbSD) => dbSD.id === sd.id);
        if (!exists) state.servicesDiscount.push(sd);
      });
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
