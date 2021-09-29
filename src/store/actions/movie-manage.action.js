import {
  getMovieAddApi,
  getMovieDeleteApi,
  getMovieManageApi,
} from "../../api/admin/movie-manage.api";

export const getMovieManageAction = (form__data, history) => async () => {
  try {
    await getMovieManageApi(form__data);
    alert("Cập nhật thành công");
    history.go();
  } catch (error) {
    alert(error);
  }
};

export const getMovieDeleteAction = (id) => async () => {
  try {
    await getMovieDeleteApi(id);
  } catch (err) {
    console.log(err);
  }
};

export const getMovieAddAction = (form__data, history) => async () => {
  try {
    await getMovieAddApi(form__data);
    alert("Thêm phim thành công");
    history.push("/admin/movie-management/edit");
  } catch (error) {
    alert(error.response?.data);
  }
};
