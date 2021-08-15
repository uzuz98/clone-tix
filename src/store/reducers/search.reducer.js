import { GET_SEARCH_MOVIE } from "../constans/search.constant";

const initialState = {
  searchingMovie: [],
};

export const searchReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SEARCH_MOVIE: {
      state.searchingMovie = payload;
      return { ...state };
    }

    default:
      return state;
  }
};
