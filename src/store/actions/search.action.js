import { getSearchMovieApi } from "../../api/search.api";
import { GET_SEARCH_MOVIE } from "../constans/search.constant";

export const getSearchMovieAction = (id) => (dispatch) => {
  getSearchMovieApi(id)
    .then((res) => {
      dispatch({
        type: GET_SEARCH_MOVIE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
