import { getSignInApi, getSignUpApi } from "../../api/auth.api";

export const getSignInAction = (userLogin, history) => async () => {
  try {
    const res = await getSignInApi(userLogin);
    history.goBack();
    localStorage.setItem("userLogin", JSON.stringify(res.data));
    localStorage.setItem("token", res.data.accessToken);
    localStorage.setItem("hoTen", res.data.hoTen);
    alert("Đăng nhập thành công");
  } catch (error) {
    alert("Sai tên đăng nhập hoặc mật khẩu");
  }
};

export const getSignUpAction = (userSignUp) => async () => {
  try {
    await getSignUpApi(userSignUp);
    alert("Đăng ký thành công");
  } catch (error) {
    console.log(error);
  }
};
