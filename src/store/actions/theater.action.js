import { getTheaterShowTimeApi } from "../../api/theater.api,";
import { GET_THEATER_SHOWTIME } from "../constans/theater.constan";

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
