import { GET_THEATER_SHOWTIME } from "../constans/theater.constan";

const initialState = {
  theaterShowTime: [],
};

export const theaterReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_THEATER_SHOWTIME: {
      state.theaterShowTime = payload;
      return { ...state };
    }
    default:
      return state;
  }
};

