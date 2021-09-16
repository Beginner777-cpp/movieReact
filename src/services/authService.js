import http from "./httpService";
import { apiUrl } from "../config.json";
const apiEndpoint = apiUrl + "/auth";
export const authUser = async (user) => {
    return await http.post(apiEndpoint, user);
};
