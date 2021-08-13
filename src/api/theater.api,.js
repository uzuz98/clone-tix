import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../config/api.config";

export const getTheaterShowTimeApi = () =>
  axios({
    url: `${baseUrl}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP09`,
    method: METHOD_HTTP.GET,
  });
