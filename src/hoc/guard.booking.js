import React from "react";
import { Redirect } from "react-router-dom";

export default function GuardBooking(props) {
  const { children } = props;
  let user;
  if (localStorage.getItem("userLogin")) {
    user = JSON.parse(localStorage.getItem("userLogin"));
  }
  if (user) {
    return children;
  } else {
    alert("Bạn cần đăng nhập để thực hiện chứ năng này");
    return <Redirect to="/sign-in"></Redirect>;
  }
}
