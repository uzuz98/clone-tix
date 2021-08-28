import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../../config/api.config";

let token = localStorage.getItem("token");

export const getAddUserApi = (user) => {
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

export const getDeleteUserApi = (taiKhoan) =>
  axios({
    method: METHOD_HTTP.DELETE,
    url: `${baseUrl}/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${taiKhoan}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const getEditUserApi = (userInfo) => {
  return axios({
    method: METHOD_HTTP.PUT,
    url: `${baseUrl}/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
    data: userInfo,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
