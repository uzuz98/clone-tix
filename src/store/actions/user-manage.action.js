import { getAddUserApi, getListUserApi } from "../../api/admin/user-manage.api";
import { GET_LIST_USER } from "../constans/user-manage.constans";

export const getAddUserAction = (user, history) => async () => {
  try {
    await getAddUserApi(user);
    alert("Thêm người dùng thành công");
    history.push("/admin/user-management/edit");
  } catch (error) {
    alert(error.response?.data);
  }
};

export const getListUserAction = () => async (dispatch) => {
  try {
    const res = await getListUserApi();
    dispatch({
      type: GET_LIST_USER,
      payload: res.data,
    });
  } catch (error) {
    console.log(error.response?.data);
  }
};
