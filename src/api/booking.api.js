import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../config/api.config";

export const getListChairApi = (id) =>
  axios({
    method: METHOD_HTTP.GET,
    url: `${baseUrl}/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${id}`,
  });

export const getBookingApi = (maLichChieu, danhSachVe) => {
  let user;
  if (localStorage.getItem("userLogin")) {
    user = JSON.parse(localStorage.getItem("userLogin"));
  }
  return axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyDatVe/DatVe`,
    data: {
      maLichChieu,
      danhSachVe,
      taiKhoanNguoiDung: user.taiKhoan,
    },
    headers: {
      Authorization: `Bearer ${user.accessToken}`,
    },
  });
};
