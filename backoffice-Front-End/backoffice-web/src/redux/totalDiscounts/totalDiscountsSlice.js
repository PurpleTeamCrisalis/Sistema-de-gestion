import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingTotalDiscounts: true,
  totalDiscounts: [],
  activeServiceDiscount: null,
};

export const totalDiscountsSlice = createSlice({
  name: "totalDiscounts",
  initialState,
  reducers: {
    onLoadTotalDiscounts: (state, { payload = [] }) => {
      state.isLoadingTotalDiscounts = false;

      state.totalDiscounts = payload?.filter((item)=>{ return item.totaldiscount > 0;});
    },
    onSetActiveTotalDiscounts: (state, { payload }) => {
      state.activeTotalDiscounts = payload;
    },
    onPullActiveTotalDiscounts: (state) => {
      state.activeTotalDiscounts = null;
    },
  },
});

export const {
  onLoadTotalDiscounts,
  onSetActiveTotalDiscounts,
  onPullActiveTotalDiscounts,
} = totalDiscountsSlice.actions;
