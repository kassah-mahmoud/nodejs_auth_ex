import { configureStore } from "@reduxjs/toolkit";
import storesReducer from "../features/stores/storesListSlice";
import storeReducer from "../features/stores/storeSlice";

export default configureStore({
  reducer: {
    stores: storesReducer,
    store: storeReducer,
  },
});
