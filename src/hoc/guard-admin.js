import React from "react";
import { Redirect } from "react-router-dom";

export default function GuardAdmin(props) {
  const { children } = props;
  let user;
  if (localStorage.getItem("userLogin")) {
    user = JSON.parse(localStorage.getItem("userLogin"));
  }
  if (user?.maLoaiNguoiDung === "QuanTri") {
    return children;
  } else {
    alert("Bạn không có quyền truy cập vào trang Admin");
    return <Redirect to="/"></Redirect>;
  }
}
