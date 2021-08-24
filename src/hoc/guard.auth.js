import { useHistory } from "react-router-dom";

export default function GuardAuth(props) {
  const history = useHistory();
  const { children } = props;
  let user;
  if (localStorage.getItem("userLogin")) {
    user = JSON.parse(localStorage.getItem("userLogin"));
  }
  if (!user) {
    return children;
  } else {
    alert("Bạn cần đăng xuất trước khi thực hiện chức năng này");
    return history.goBack();
  }
}
