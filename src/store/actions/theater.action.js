import {
  getTheaterCinemaApi,
  getTheaterListApi,
  getTheaterShowTimeApi,
} from "../../api/theater.api,";
import {
  GET_THEATER_CINEMA,
  GET_THEATER_LIST,
  GET_THEATER_SHOWTIME,
} from "../constans/theater.constan";

export const getTheaterListAction = () => (dispatch) => {
  getTheaterListApi()
    .then((res) => {
      dispatch({
        type: GET_THEATER_LIST,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTheaterCinemaAction = (cinema) => (dispatch) => {
  getTheaterCinemaApi(cinema)
    .then((res) => {
      dispatch({
        type: GET_THEATER_CINEMA,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getTheaterShowTimeAction = (cinema) => (dispatch) => {
  getTheaterShowTimeApi(cinema)
    .then((res) => {
      dispatch({
        type: GET_THEATER_SHOWTIME,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
