import {
  GET_THEATER_CINEMA,
  GET_THEATER_LIST,
  GET_THEATER_SHOWTIME,
} from "../constans/theater.constan";

const initialState = {
  theaterList: [],
  theaterCinema: [],
  theaterShowTime: {},
};

export const theaterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_THEATER_LIST: {
      state.theaterList = payload;
      return { ...state };
    }
    case GET_THEATER_CINEMA: {
      state.theaterCinema = payload;
      return { ...state };
    }
    case GET_THEATER_SHOWTIME: {
      state.theaterShowTime = payload;
      return { ...state };
    }
    default:
      return state;
  }
};
