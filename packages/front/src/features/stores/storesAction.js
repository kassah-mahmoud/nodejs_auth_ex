import axios from "axios";
import {
  fetchSingleStoreLoading,
  fetchSingleStoreFail,
  fetchSingleStoreSuccess,
} from "./storeSlice";

import {
  fetchStoresFail,
  fetchStoresLoading,
  fetchStoresSuccess,
} from "./storesListSlice";

export const fetchAllStores =
  ({ size, page } = {}) =>
  async (dispatch) => {
    dispatch(fetchStoresLoading());
    try {
      const res = await axios.get("/api/stores", {
        params: {
          size,
          page,
        },
      });

      dispatch(fetchStoresSuccess(res.data));
    } catch (error) {
      console.log(error);
      dispatch(fetchStoresFail("Something went wrong!"));
    }
  };

export const fetchSingleStore = (id) => async (dispatch) => {
  console.log(id);
  dispatch(fetchSingleStoreLoading());
  try {
    const res = await axios.get(`/api/stores/${id}`);

    dispatch(fetchSingleStoreSuccess(res.data));
    console.log(res.data);
  } catch (error) {
    console.log(error);
    dispatch(fetchSingleStoreFail("Something went wrong!"));
  }
};
