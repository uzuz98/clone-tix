import axios from "axios";
import { baseUrl, METHOD_HTTP } from "../../config/api.config";

export const getScheduleTheaterApi = () =>
  axios({
    method: METHOD_HTTP.GET,
    url: `${baseUrl}/QuanLyRap/LayThongTinHeThongRap`,
  });

export const getScheduleCinemaApi = (maHeThongRap) =>
  axios({
    method: METHOD_HTTP.GET,
    url: `${baseUrl}/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`,
  });

export const getScheduleCreateApi = (ticketDetail) => {
  let user = localStorage.getItem("token");
  return axios({
    method: METHOD_HTTP.POST,
    url: `${baseUrl}/QuanLyDatVe/TaoLichChieu`,
    data: ticketDetail,
    headers: {
      Authorization: `Bearer ${user}`,
    },
  });
};
