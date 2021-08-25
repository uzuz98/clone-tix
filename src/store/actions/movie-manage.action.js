import {
  getMovieDeleteApi,
  getMovieManageApi,
} from "../../api/admin/movie-manage.api";

export const getMovieManageAction = (form__data) => async () => {
  try {
    await getMovieManageApi(form__data);
    alert("Cập nhật thành công");
    setTimeout(() => {
      window.location.reload();
    }, 0);
  } catch (error) {
    alert(error);
  }
};

export const getMovieDeleteAction = (id) => async () => {
  try {
    await getMovieDeleteApi(id);
  } catch (error) {
    console.log(error);
    alert(error.response?.data);
  }
};
