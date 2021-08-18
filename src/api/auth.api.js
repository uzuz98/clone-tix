import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../config/api.config";

export const getSignInApi = (userLogin) =>
  axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyNguoiDung/DangNhap`,
    data: userLogin,
  });

export const getSignUpApi = (userSignUp) => {
  axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyNguoiDung/DangKy`,
    data: userSignUp,
  });
};
