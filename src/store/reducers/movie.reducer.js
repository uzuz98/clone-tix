import { GET_MOVIE_DETAIL, GET_MOVIE_LIST } from "../constans/movie.constant";

const initialState = {
  movieList: [],
  movieDetail: [],
};

export const movieReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_MOVIE_LIST: {
      state.movieList = payload;
      return { ...state };
    }
    case GET_MOVIE_DETAIL: {
      state.movieDetail = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
