import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../../config/api.config";

export const getMovieManageApi = (form__data) => {
  let user = localStorage.getItem("token");
  return axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyPhim/CapNhatPhimUpload`,
    data: form__data,
    headers: {
      Authorization: `Bearer ${user}`,
    },
  });
};
