import { GET_LIST_USER } from "../constans/user-manage.constans";

const initialState = {
  userList: [],
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_USER: {
      state.userList = payload;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
