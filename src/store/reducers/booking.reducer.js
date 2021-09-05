import { CHOICE_CHAIR, GET_LIST_CHAIR } from "../constans/booking.constans";

const initialState = {
  listChair: [],
  totalMoney: 0,
  listSeat: [],
};

export const bookingReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_CHAIR: {
      state.listChair = payload;
      return { ...state };
    }
    case CHOICE_CHAIR: {
      let { danhSachGhe } = state.listChair;
      danhSachGhe = [...danhSachGhe];
      const index = danhSachGhe.findIndex(
        (chair) => chair.maGhe === payload.maGhe
      );
      if (index !== -1) {
        const oldChair = danhSachGhe[index];
        const newChair = { ...oldChair, dangChon: !oldChair.dangChon };
        danhSachGhe[index] = newChair;
        state.listChair.danhSachGhe = danhSachGhe;
        if (danhSachGhe[index].dangChon === true) {
          state.totalMoney = state.totalMoney + danhSachGhe[index].giaVe;
          state?.listSeat?.push(danhSachGhe[index].stt);
        } else {
          state.totalMoney = state?.totalMoney - danhSachGhe[index].giaVe;
          const listSeatFilter = state?.listSeat?.filter(
            (seat) => danhSachGhe[index].stt !== seat
          );
          if (listSeatFilter) {
            state.listSeat = [...listSeatFilter];
          }
        }
      }
      return { ...state };
    }
    case "CLEAR_STORE": {
      state.listSeat = [];
      state.totalMoney = 0;
      return { ...state };
    }
    default: {
      return state;
    }
  }
};
