import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";
http.setJwt(getJwt());
export const login = async (user) => {
  let { data: token } = await http.post(apiEndpoint, user);
  localStorage.setItem(tokenKey, token);
};
export const loginWithJwt = async (jwt) => {
  localStorage.setItem(tokenKey, jwt);
};

export const getUser = () => {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
};
export const logout = () => {
  localStorage.removeItem(tokenKey);
};
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  login,
  loginWithJwt,
  getUser,
  logout,
  getJwt,
};
