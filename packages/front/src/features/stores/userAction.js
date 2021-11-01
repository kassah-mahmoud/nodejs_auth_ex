import authApi from "../../api/authApi";
import { USER_LOCAL_STORAGE_KEY } from "../../api/mainApi";

import {
  loginUser,
  logoutUser,
  setError,
  setLoading,
  setSuccess,
} from "./userSlice";

export const login = (data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await authApi.login(data);

    if (res?.user) {
      dispatch(loginUser(res.user));
      localStorage.setItem(
        USER_LOCAL_STORAGE_KEY,
        JSON.stringify({
          user: res.user,
          accessToken: res.token,
        })
      );
      dispatch(setSuccess("Logged in successfully"));
    } else {
      dispatch(setError("Something went wrong!"));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const register = (data) => async (dispatch) => {
  dispatch(setLoading());
  try {
    const res = await authApi.register(data);

    if (res?.user) {
      dispatch(loginUser(res.user));
      localStorage.setItem(
        USER_LOCAL_STORAGE_KEY,
        JSON.stringify({
          user: res.user,
          accessToken: res.token,
        })
      );
      dispatch(setSuccess("Your Account has been registered successfully"));
    } else {
      dispatch(setError("Something went wrong!"));
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const logout = (navigate) => (dispatch) => {
  dispatch(logoutUser());
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  dispatch(setSuccess("Logged out successfully"));
  navigate && navigate("/");
};
