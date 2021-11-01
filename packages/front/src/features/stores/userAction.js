import authApi from "../../api/authApi";
import { USER_LOCAL_STORAGE_KEY } from "../../api/mainApi";
import { navigate } from "@reach/router";

import {
  loginUser,
  logoutUser,
  setError,
  setLoading,
  setSuccess,
} from "./userSlice";

export const login = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  authApi
    .login(data)
    .then((res) => {
      const userData = res?.data;
      if (userData?.user) {
        dispatch(loginUser(userData.user));
        localStorage.setItem(
          USER_LOCAL_STORAGE_KEY,
          JSON.stringify({
            user: userData.user,
            accessToken: userData.token,
          })
        );
        dispatch(setSuccess("Logged in successfully"));
        navigate("/");
      } else {
        dispatch(setError("Something went wrong!"));
      }
    })

    .catch((error) => {
      console.log(error?.response?.data?.message);
      dispatch(setError(error?.response?.data?.message));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const register = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  authApi
    .register(data)
    .then((res) => {
      const userData = res?.data;
      if (userData?.user) {
        dispatch(loginUser(userData.user));
        localStorage.setItem(
          USER_LOCAL_STORAGE_KEY,
          JSON.stringify({
            user: userData.user,
            accessToken: userData.token,
          })
        );
        dispatch(setSuccess("Registered successfully"));
        navigate("/");
      } else {
        dispatch(setError("Something went wrong!"));
      }
    })

    .catch((error) => {
      console.log(error);
      dispatch(setError(error?.response?.data?.message));
    })
    .finally(() => {
      dispatch(setLoading(false));
    });
};

export const logout = (navigate) => (dispatch) => {
  dispatch(logoutUser());
  localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  dispatch(setSuccess("Logged out successfully"));
  navigate && navigate("/");
};
