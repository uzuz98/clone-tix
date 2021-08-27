import {
  getScheduleCinemaApi,
  getScheduleCreateApi,
  getScheduleTheaterApi,
} from "../../api/admin/schedule-manage";
import {
  GET_SCHEDULE_CINEMA,
  GET_SCHEDULE_OPTION,
} from "../constans/schedule-manage.constants";

export const getScheduleTheaterAction = () => async (dispatch) => {
  try {
    const res = await getScheduleTheaterApi();
    console.log(res);
    dispatch({
      payload: res.data,
      type: GET_SCHEDULE_OPTION,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getScheduleCinemAction = (maHeThongRap) => async (dispatch) => {
  try {
    const res = await getScheduleCinemaApi(maHeThongRap);
    dispatch({
      payload: res.data,
      type: GET_SCHEDULE_CINEMA,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getScheduleCreateAction =
  (ticketDetail, history, id, tenPhim) => async () => {
    try {
      await getScheduleCreateApi(ticketDetail);
      history.push(`/admin/schedule/delete/${id}/${tenPhim}`);
      alert("Thành công");
    } catch (error) {
      console.log(error);
      alert(error.response?.data);
    }
  };