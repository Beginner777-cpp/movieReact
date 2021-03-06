import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("Unexpected error");
    logger.log(error);
    // console.log("Logging error", error);
    return Promise.reject(error);
  }
  return Promise.reject(error);
});
function setJwt(jwt){
  axios.defaults.headers.common["x-auth-token"] = jwt;

}
const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  patch: axios.patch,
  delete: axios.delete,
  setJwt
};
export default http;
