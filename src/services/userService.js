import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/users";
export const addUser = async (user) => {
    return await http.post(apiEndpoint, user);
};
