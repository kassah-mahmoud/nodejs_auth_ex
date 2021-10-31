import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "store",
  initialState: {
    isLoading: false,
    store: {},
    error: null,
  },
  reducers: {
    fetchSingleStoreLoading: (state) => {
      console.log("fetchLoading");
      state.error = null;
      state.isLoading = true;
    },

    fetchSingleStoreSuccess: (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.store = payload;
    },

    fetchSingleStoreFail: (state, { payload }) => {
      state.isLoading = false;
      state.error = payload;
    },
  },
});

const { reducer, actions } = storeSlice;

export const {
  fetchSingleStoreSuccess,
  fetchSingleStoreLoading,
  fetchSingleStoreFail,
} = actions;

export default reducer;
