import {
  GET_SCHEDULE_CINEMA,
  GET_SCHEDULE_OPTION,
} from "../constans/schedule-manage.constants";

const initialState = {
  listTheater: [],
  listCinema: [],
};

export const scheduleManageReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_SCHEDULE_OPTION: {
      state.listTheater = payload;
      return { ...state };
    }
    case GET_SCHEDULE_CINEMA: {
      state.listCinema = payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
