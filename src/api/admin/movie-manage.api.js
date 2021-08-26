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

export const getMovieDeleteApi = (id) => {
  let user = localStorage.getItem("token");
  return axios({
    method: METHOD_HTTP.DELETE,
    url: `${baseUrl}/QuanLyPhim/XoaPhim?MaPhim=${id}`,
    headers: {
      Authorization: `Bearer ${user}`,
    },
  });
};

export const getMovieAddApi = (form__data) => {
  let user = localStorage.getItem("token");
  return axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyPhim/ThemPhimUploadHinh`,
    data: form__data,
    headers: {
      Authorization: `Bearer ${user}`,
    },
  });
};
