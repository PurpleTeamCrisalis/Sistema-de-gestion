import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoadingServicesDiscount: true,
  servicesDiscount: [
    //Borrar
    {
      clientid: 1,
      clientname: "diego",
      lastname: "paez",
      dni: 46013734,
      phone: 43512226,
      adress: "calle siempre viva",
      startdate: "2023-10-31T00:00:00.000+00:00",
      clientenabled: true,
      isbussiness: true,
      bussinessname: "x.srl",
      cuit: 27137460350,
      serviceid: 2,
      servicename: "Un servicio moderado 100",
      description: "Un servicio de $100",
      baseprice: 90.0,
      isspecial: true,
      suportcharge: 0.0,
      serviceenabled: true,
      orderdate: "2023-11-25T03:00:00.000+00:00",
      totaldiscount: 22.000000000000004,
    },
  ],
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
