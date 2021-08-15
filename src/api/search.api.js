import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../config/api.config";

export const getSearchMovieApi = (id) =>
  axios({
    url: `${baseUrl}/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${id}`,
    method: METHOD_HTTP.GET,
  });
