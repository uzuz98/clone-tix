import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GROUP_ID } from '../../../../config/groupid.config'
import { getAddUserAction } from '../../../../store/actions/user-manage.action'
import './add-user.style.scss'

export default function UserAdd() {
    const [user, setUser] = useState({
        info: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: GROUP_ID,
            hoTen: "",
            maLoaiNguoiDung: "",
        },
        error: {
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            hoTen: "",
            checkMatKhau: "",
        },
        isValid: false,
    })
    useEffect(() => {
        checkIsValid()
    }, [user.isValid])
    const dispatch = useDispatch()
    const handleChange = (event) => {
        const { name, value } = event.target
        let errorMessage = ""
        if (name === "email") {
            const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!regex.test(value)) {
                errorMessage = "Không đúng định dạng của email (vd: abc@gmail.com)";
            }
        }
        //check the fullname is have the number or not
        if (name === "hoTen") {
            const regex = /^(?:((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-.\s])){1,}(['’,\-\.]){0,1}){2,}(([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-. ]))*(([ ]+){0,1}(((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){1,})(['’\-,\.]){0,1}){2,}((([^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]'’,\-\.\s])){2,})?)*)$/
            if (!regex.test(value)) {
                errorMessage = "Tên không được nhập số"
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
        if (name === "checkMatKhau") {
            if (value !== user.info.matKhau) {
                errorMessage = "Mật khẩu và xác nhận mật khẩu không giống nhau"
            }
        }
        let error = { ...user.error, [name]: errorMessage };
        let userInfo = { ...user.info, [name]: value };
        setUser({
            error: error,
            info: userInfo
        })
    }
    const checkIsValid = () => {
        let isValid = true
        for (let key in user.error) {
            if (user.error[key] !== "" || user.info[key] === "") {
                isValid = false
            }
        }
        setUser({
            ...user,
            isValid: isValid
        })
    }
    const history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault()
        dispatch(getAddUserAction(user.info, history))
    }
    return (
        <section className="add__user">
            <div className="add__user--header">
                <h1>Thêm người dùng</h1>
                <h3>Điền đầy đủ thông tin sau đó ấn xác nhận</h3>
                <h3>để thêm người dùng mới</h3>
            </div>
            <form className="form__addUser" onSubmit={handleSubmit}>
                <div className="form__group">
                    <label htmlFor="taiKhoan">Tài khoản</label>
                    <input onBlur={handleChange} onChange={handleChange} value={user.taiKhoan} type="text" name="taiKhoan" id="taiKhoan" />
                    <p>{user.error.taiKhoan}</p>
                </div>
                <div className="form__group">
                    <label htmlFor="matKhau">Mật khẩu</label>
                    <input onBlur={handleChange} onChange={handleChange} value={user.matKhau} type="password" name="matKhau" id="matKhau" />
                    <p>{user.error.matKhau}</p>
                </div>
                <div className="form__group">
                    <label htmlFor="checkMatKhau">Nhập lại mật khẩu</label>
                    <input onBlur={handleChange} onChange={handleChange} type="password" name="checkMatKhau" id="checkMatKhau" />
                    <p>{user.error.checkMatKhau}</p>
                </div>
                <div className="form__group">
                    <label htmlFor="email">Email</label>
                    <input onBlur={handleChange} onChange={handleChange} value={user.email} type="email" name="email" id="email" />
                    <p>{user.error.email}</p>
                </div>
                <div className="form__group">
                    <label htmlFor="soDt">Số Đt</label>
                    <input onBlur={handleChange} onChange={handleChange} value={user.soDt} type="text" name="soDt" id="soDt" />
                    <p>{user.error.soDt}</p>
                </div>
                <div className="form__group">
                    <label htmlFor="hoTen">Họ Tên</label>
                    <input onBlur={handleChange} onChange={handleChange} value={user.hoTen} type="text" name="hoTen" id="hoTen" />
                    <p>{user.error.hoTen}</p>
                </div>
                <div className="form__group">
                    <label htmlFor="maLoaiNguoiDung">Loại Người Dùng</label>
                    <select onChange={handleChange} value={user.maLoaiNguoiDung} type="text" name="maLoaiNguoiDung" id="maLoaiNguoiDung" >
                        <option selected hidden>Vui lòng chọn loại người dùng</option>
                        <option value="QuanTri">Quản Trị</option>
                        <option value="KhachHang">Khách Hàng</option>
                    </select>
                </div>
                <div className="submit__form">
                    {
                        user.isValid ?
                            <button className="btn btn-success">Xác nhận</button>
                            :
                            <button disabled className="btn btn-success">Xác nhận</button>

                    }
                </div>
            </form>
        </section>
    )
}
