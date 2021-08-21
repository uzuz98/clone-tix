import { GET_PROFILE } from "../constans/profile.constans";

const initialState = {
  profileInfo: [],
};

export const profileReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE: {
      state.profileInfo = payload;
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
