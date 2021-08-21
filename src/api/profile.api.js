import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../config/api.config";

export const GetProfileApi = () => {
  let user;
  if (localStorage.getItem("userLogin")) {
    user = JSON.parse(localStorage.getItem("userLogin"));
  }
  return axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyNguoiDung/ThongTinTaiKhoan`,
    data: {
      taiKhoan: user.taiKhoan,
    },
  });
};
