import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../config/api.config";

export const getTheaterListApi = () =>
  axios({
    url: `${baseUrl}/QuanLyRap/LayThongTinHeThongRap`,
    method: METHOD_HTTP.GET,
  });

export const getTheaterCinemaApi = (cinema) =>
  axios({
    url: `${baseUrl}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${cinema}`,
    method: METHOD_HTTP.GET,
  });

export const getTheaterShowTimeApi = (cinema) =>
  axios({
    url: `${baseUrl}/QuanLyRap/LayThongTinLichChieuHeThongRap?maHeThongRap=${cinema}&maNhom=GP06`,
    method: METHOD_HTTP.GET,
  });
