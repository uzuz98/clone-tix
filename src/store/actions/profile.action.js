import { GetProfileApi } from "../../api/profile.api";
import { GET_PROFILE } from "../constans/profile.constans";

export const getProfileAction = () => async (dispatch) => {
  try {
    const res = await GetProfileApi();
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};
