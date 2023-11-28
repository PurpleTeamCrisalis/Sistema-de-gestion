import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingServicesDiscount: true,
  servicesDiscount: [],
  activeServiceDiscount: null,
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
      state.activeServiceDiscount = payload;
    },
    onPullActiveServicesDiscount: (state) => {
      state.activeServiceDiscount = null;
    },
  },
});

export const {
  onLoadServicesDiscount,
  onSetActiveServicesDiscount,
  onPullActiveServicesDiscount,
} = servicesDiscountSlice.actions;
