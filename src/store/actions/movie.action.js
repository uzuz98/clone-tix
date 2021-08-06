import { getMovieDetailApi, getMovieListApi } from "../../api/movie.api";
import { GET_MOVIE_DETAIL, GET_MOVIE_LIST } from "../constans/movie.constant";

export const getMovieListAction = () => {
  return (dispatch) => {
    getMovieListApi()
      .then((res) => {
        dispatch({
          type: GET_MOVIE_LIST,
          payload: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getMovieDetailAction = (id) => (dispatch) => {
  getMovieDetailApi(id)
    .then((res) => {
      dispatch({
        type: GET_MOVIE_DETAIL,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
