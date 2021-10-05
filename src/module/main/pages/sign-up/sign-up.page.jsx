import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { GROUP_ID } from '../../../../config/groupid.config'
import logo from '../../../../img/logo.png'
import { getSignUpAction } from '../../../../store/actions/auth.action'

export default function SignUp() {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const dispatch = useDispatch()
    const [userSignUp, setUserSignUp] = useState({
        user: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            hoTen: "",

            maLoaiNguoiDung: "KhachHang",
            maNhom: GROUP_ID
        },
        error: {
            hoTen: "",
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
        },
        valid: false,
    })
    //call the checkvalid when the valid is re update
    useEffect(() => {
        window.scrollTo(0, 0)
        checkIsValid()
    }, [userSignUp.valid])
    //function to check when the user type on the form option
    const handleChange = (event) => {
        const { value, name, type } = event.target
        let errorMessage = "";
        //check the email type is exact or not
        if (type === "email") {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!regex.test(value)) {
                errorMessage = "Không đúng định dạng của email (vd: abc@gmail.com)";
            }
        }
        //check the fullname is have the number or not
        if (name === "hoTen") {
            const regex = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/
            if (!regex.test(value)) {
                errorMessage = "Tên không hợp lệ"
            }
        }
        if (name === "taiKhoan") {
            const regex = /^\S*$/
            if (!regex.test(value)) {
                errorMessage = "Tài khoản không được có khoảng trắng"
            }
        }
        //check the password must have at least 1 letter and 1 number and must be >6 digits and no space
        if (name === "matKhau") {
            const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/
            if (!regex.test(value)) {
                errorMessage = "Mật khẩu trên 6 ký tự, ít nhất 1 chữ, 1 số và không được có khoảng trắng"
            }
        }
        //check the phone number is exact with the Vietnam phone (84 or 0xxx)
        if (name === "soDt") {
            const regex = /(84|0[1-9])+([0-9]{8,9})\b/
            if (!regex.test(value)) {
                errorMessage = "Số điện thoại không hợp lệ (vd: 0912345678 hoặc 8412345678)"
            }
        }
        //check if the user have typed or not yet
        if (value.trim() === "") {
            if (name === "taiKhoan") {
                errorMessage = "Tài khoản không được bỏ trống";
            } else errorMessage = "Mật khẩu không được bỏ trống";
            switch (name) {
                case "hoTen": {
                    errorMessage = "Họ tên không được bỏ trống";
                    break;
                }
                case "taiKhoan": {
                    errorMessage = "Tài khoản không được bỏ trống";
                    break;
                }
                case "matKhau": {
                    errorMessage = "Mật khẩu không được bỏ trống";
                    break;
                }
                case "email": {
                    errorMessage = "Email không được bỏ trống";
                    break;
                }
                case "soDt": {
                    errorMessage = "Số điện thoại không được bỏ trống";
                    break;
                }
                default:
                    break;
            }
        }
        let error = { ...userSignUp.error, [name]: errorMessage };
        let user = { ...userSignUp.user, [name]: value };
        setUserSignUp({
            error: error,
            user: user,
        })
    }
    //check the user had typed all the option or not yet
    const checkIsValid = () => {
        let valid = true
        for (let key in userSignUp.error) {
            if (userSignUp.error[key] !== "" || userSignUp.user[key] === "") {
                valid = false
            }
        }
        setUserSignUp({
            ...userSignUp,
            valid: valid
        })
    }
    const history = useHistory()
    //submit form and call api to upload user
    const handleSubmitForm = (event) => {
        event.preventDefault()
        dispatch(getSignUpAction(userSignUp.user, history))
    }

    return (
        <section className="sign__in">
            <div className="sign__in--top text-center">
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                <p className="sign__in--title">
                    Đăng nhập
                </p>
            </div>
            <form className="form" onSubmit={handleSubmitForm}>
                <div className="form-group">
                    <input
                        onBlur={handleChange}
                        required
                        type="text"
                        className="form-control"
                        id="hoTen"
                        value={`${userSignUp.user.hoTen}`}
                        name="hoTen"
                        onChange={handleChange}
                        minLength="4"
                    />
                    <label htmlFor="hoTen"
                        className={`${userSignUp.user.hoTen}` === "" ? `form__label` : `form__label active`}>Họ Tên*</label>
                    <p class="text-danger">{userSignUp.error.hoTen}</p>
                </div>
                <div className="form-group">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="taiKhoan"
                        value={`${userSignUp.user.taiKhoan}`}
                        name="taiKhoan"
                        onChange={handleChange}
                        onBlur={handleChange}
                        minLength="4"
                    />
                    <label htmlFor="taiKhoan"
                        className={`${userSignUp.user.taiKhoan}` === "" ? `form__label` : `form__label active`}>Tài Khoản*</label>
                    <p class="text-danger">{userSignUp.error.taiKhoan}</p>
                </div>
                <div className="form-group">
                    <input
                        required
                        type="password"
                        className="form-control"
                        id="matKhau"
                        name="matKhau"
                        value={`${userSignUp.user.matKhau}`}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    <label htmlFor="matKhau"
                        className={`${userSignUp.user.matKhau}` === "" ? `form__label` : `form__label active`}>Mật Khẩu*</label>
                    <p class="text-danger">{userSignUp.error.matKhau}</p>
                </div>
                <div className="form-group">
                    <input
                        required
                        type="email"
                        className="form-control"
                        id="email"
                        value={`${userSignUp.user.email}`}
                        name="email"
                        onChange={handleChange}
                        onBlur={handleChange}
                        minLength="4"
                    />
                    <label htmlFor="email"
                        className={`${userSignUp.user.email}` === "" ? `form__label` : `form__label active`}>Email*</label>
                    <p class="text-danger">{userSignUp.error.email}</p>
                </div>
                <div className="form-group">
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="soDt"
                        value={`${userSignUp.user.soDt}`}
                        name="soDt"
                        onChange={handleChange}
                        onBlur={handleChange}
                        minLength="4"
                    />
                    <label htmlFor="soDt"
                        className={`${userSignUp.user.soDt}` === "" ? `form__label` : `form__label active`}>Số điện thoại*</label>
                    <p class="text-danger">{userSignUp.error.soDt}</p>
                </div>
                {
                    userSignUp.valid === true ?
                        (
                            <button type="submit" className="btn btn-primary">
                                Đăng nhập
                            </button>
                        ) :
                        (
                            <button type="submit" className="btn btn-primary" disabled>
                                Đăng nhập
                            </button>
                        )

                }

            </form>
            <div className="sign__in--bottom">

                <div className="sign__up">
                    <NavLink to="/sign-in">Bạn đã có tài khoản? Đăng nhập ngay</NavLink>
                </div>
            </div>
            <div className="sign__in--footer text-center">
                <p>Copyright © <NavLink to="/">Tix.vn </NavLink> 2021</p>
            </div>
        </section>
    )
}
