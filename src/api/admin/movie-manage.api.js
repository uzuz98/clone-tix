import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../../config/api.config";
let token = localStorage.getItem("token");

export const getMovieManageApi = (form__data) => {
  return axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyPhim/CapNhatPhimUpload`,
    data: form__data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMovieDeleteApi = (id) => {
  return axios({
    method: METHOD_HTTP.DELETE,
    url: `${baseUrl}/QuanLyPhim/XoaPhim?MaPhim=${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMovieAddApi = (form__data) => {
  return axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyPhim/ThemPhimUploadHinh`,
    data: form__data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
