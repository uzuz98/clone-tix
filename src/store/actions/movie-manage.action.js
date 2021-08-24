import { getMovieManageApi } from "../../api/admin/movie-manage.api";

export const getMovieManageAction = (form__data, toggle) => async () => {
  try {
    const res = await getMovieManageApi(form__data);
    console.log(res);
    alert("Cập nhật thành công");
    toggle = false;
    setTimeout(() => {
      window.location.reload();
    }, 0);
  } catch (error) {
    console.log(error);
    alert(error);
  }
};
