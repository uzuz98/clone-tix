import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../config/api.config";
import { GROUP_ID } from "../config/groupid.config";

export const getTheaterShowTimeApi = () =>
  axios({
    url: `${baseUrl}/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${GROUP_ID}`,
    method: METHOD_HTTP.GET,
  });
