import { createSlice } from "@reduxjs/toolkit";
import { USER_LOCAL_STORAGE_KEY } from "../../api/mainApi";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY))?.user,
    error: null,
    success: null,
  },
  reducers: {
    setLoading: (state, { payload }) => {
      state.error = null;
      state.isLoading = payload;
    },

    loginUser: (state, { payload }) => {
      state.user = payload;
    },

    logoutUser: (state) => {
      state.user = {};
    },

    setError: (state, { payload }) => {
      state.error = payload;
      state.success = null;
    },

    setSuccess: (state, { payload }) => {
      state.success = payload;
      state.error = null;
    },
  },
});

export const { setLoading, loginUser, logoutUser, setError, setSuccess } =
  userSlice.actions;

export default userSlice;
