import { getBookingApi, getListChairApi } from "../../api/booking.api";
import { CHOICE_CHAIR, GET_LIST_CHAIR } from "../constans/booking.constans";

export const getListChairAction = (id, setIsLoading) => async (dispatch) => {
  try {
    const res = await getListChairApi(id);
    dispatch({
      type: GET_LIST_CHAIR,
      payload: res.data,
    });
    setIsLoading(true);
  } catch (error) {
    console.log(error);
  }
};

export const choiceChairAction = (chair) => {
  return {
    type: CHOICE_CHAIR,
    payload: chair,
  };
};

export const getBookingAction =
  (maLichChieu, danhSachVe, history) => async () => {
    try {
      await getBookingApi(maLichChieu, danhSachVe);
      alert("Đặt vé thành công");
      history.push("/profile");
    } catch (error) {
      console.log(error);
    }
  };
