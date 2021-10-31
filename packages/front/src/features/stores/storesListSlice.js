import { createSlice } from "@reduxjs/toolkit";

export const storesListSlice = createSlice({
  name: "stores",
  initialState: {
    isLoading: false,
    stores: {},
    error: null,
  },
  reducers: {
    fetchStoresLoading: (state) => {
      console.log("fetchLoading");
      state.error = null;
      state.isLoading = true;
    },

    fetchStoresSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.stores = payload;
    },

    fetchStoresFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = storesListSlice;

export const { fetchStoresSuccess, fetchStoresLoading, fetchStoresFail } =
  actions;

export default reducer;
