import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../config/api.config";

export const getMovieListApi = () =>
  axios({
    url: `${baseUrl}/QuanLyPhim/LayDanhSachPhim?maNhom=GP06 `,
    method: METHOD_HTTP.GET,
  });

export const getMovieDetailApi = (id) =>
  axios({
    url: `${baseUrl}/QuanLyPhim/LayThongTinPhim?MaPhim=${id}`,
    method: METHOD_HTTP.GET,
  });
