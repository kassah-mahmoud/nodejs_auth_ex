import axios from "axios";

export const USER_LOCAL_STORAGE_KEY = "node_auth_user";

export const API_URL = "/api/";

const instance = axios.create({
  baseURL: API_URL,
});
const user = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));
const access_token =
  user && user.accessToken && user.accessToken !== ""
    ? `Bearer ${user.accessToken}`
    : null;

instance.defaults.headers.common["Authorization"] = access_token;

const mainApi = {
  getCurrentUser: instance.get("me"),
};

export default mainApi;
