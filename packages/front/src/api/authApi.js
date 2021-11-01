import axios from "axios";
import { API_URL } from "./mainApi";

const instance = axios.create({
  baseURL: `${API_URL}/`,
});

delete instance.defaults.headers.common.Authorization;

export { instance as authInstance };

const authApi = {
  login: (data) => instance.post("login", data),
  register: (data) => instance.post("register", data),
};

export default authApi;
