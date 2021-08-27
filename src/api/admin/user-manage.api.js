import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../../config/api.config";

export const getAddUserApi = (user) => {
  let token = localStorage.getItem("token");
  return axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyNguoiDung/ThemNguoiDung`,
    data: user,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getListUserApi = () =>
  axios({
    method: METHOD_HTTP.GET,
    url: `${baseUrl}/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=GP09`,
  });
