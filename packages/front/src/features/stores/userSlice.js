import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    isLoading: false,
    user: JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY)),
    error: null,
    success: null,
  },
  reducers: {
    setLoading: (state) => {
      state.error = null;
      state.isLoading = true;
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
