import React, { useEffect } from 'react'
import "./sign-in.style.scss"
import logo from '../../../../img/logo.png'
import { useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getSignInAction } from '../../../../store/actions/auth.action'

export default function SignIn() {
    const [userLogin, setUserLogin] = useState({
        user: {
            taiKhoan: "",
            matKhau: "",
        },
        error: {
            taiKhoan: "",
            matKhau: "",
        }
    })
    //go to the top after render
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    const history = useHistory()
    const dispatch = useDispatch()

    const handleChange = (event) => {
        const { value, name } = event.target
        let errorMessage = "";
        //validation the empty input
        if (value.trim() === "") {
            if (name === "taiKhoan") {
                errorMessage = "Tài khoản không được bỏ trống";
            } else errorMessage = "Mật khẩu không được bỏ trống";
        }
        //error when the input is empty
        let error = { ...userLogin.error, [name]: errorMessage };
        //set set value for the user
        let user = { ...userLogin.user, [name]: value };
        setUserLogin({
            error: error,
            user: user,
        })
    }
    //call api log in when submit form
    const handleSubmitForm = (event) => {
        event.preventDefault()
        dispatch(getSignInAction(userLogin.user, history))
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
                        required
                        type="text"
                        className="form-control"
                        id="taiKhoan"
                        value={`${userLogin.user.taiKhoan}`}
                        name="taiKhoan"
                        onChange={handleChange}
                        onBlur={handleChange}
                        minLength="4"
                    />
                    <label htmlFor="taiKhoan"
                        className={`${userLogin.user.taiKhoan}` === "" ? `form__label` : `form__label active`}>Tài Khoản</label>
                    <p class="text-danger">{userLogin.error.taiKhoan}</p>
                </div>
                <div className="form-group">
                    <input
                        required
                        type="password"
                        className="form-control"
                        id="matKhau"
                        name="matKhau"
                        value={`${userLogin.user.matKhau}`}
                        onChange={handleChange}
                        onBlur={handleChange}
                    />
                    <label htmlFor="matKhau"
                        className={`${userLogin.user.matKhau}` === "" ? `form__label` : `form__label active`}>Mật Khẩu</label>
                    <p class="text-danger">{userLogin.error.matKhau}</p>
                </div>
                <button type="submit" className="btn btn-primary">
                    Đăng nhập
                </button>
            </form>
            <div className="sign__in--bottom">
                <div className="forgot">
                    <a href="#">Quên mật khẩu?</a>
                </div>
                <div className="sign__up">
                    <NavLink to="/sign-up">Bạn chưa có tài khoản? Đăng ký ngay</NavLink>
                </div>
            </div>
            <div className="sign__in--footer text-center">
                <p>Copyright © <NavLink to="/">Tix.vn </NavLink> 2021</p>
            </div>
        </section>
    )
}
