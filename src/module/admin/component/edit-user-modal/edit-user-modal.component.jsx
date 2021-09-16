import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { GROUP_ID } from '../../../../config/groupid.config'
import { getEditUserAction } from '../../../../store/actions/user-manage.action'
import './edit-user-modal.style.scss'

export default function EditUserModalComponent(props) {
    const { userEdit, setUserEdit, toggleModal } = props
    const [userB, setUserB] = useState({
    })
    //check if user type all the input will available for button submit
    //and set the userB for change the information
    useEffect(() => {
        checkIsValid()
        setUserB({
            taiKhoan: userEdit.user.taiKhoan,
            matKhau: userEdit.user.matKhau,
            hoTen: userEdit.user.hoTen,
            soDt: userEdit.user.soDt,
            maLoaiNguoiDung: userEdit.user.maLoaiNguoiDung,
            maNhom: GROUP_ID,
            email: userEdit.user.email,
        })
    }, [userEdit?.isValid])
    const dispatch = useDispatch()
    //validation form and set value for user
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
                case ("matKhau" || "checkMatKhau"): {
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
            if (value !== userEdit?.user?.matKhau) {
                errorMessage = "Mật khẩu và xác nhận mật khẩu không giống nhau"
            }
        }
        let error = { ...userEdit.error, [name]: errorMessage };
        let userInfo = { ...userEdit.user, [name]: value };
        setUserEdit({
            error: error,
            user: userInfo,
        })

    }
    //function to check form is type all or not yet
    const checkIsValid = () => {
        let isValid = true
        for (let key in userEdit?.error) {
            if (userEdit.error[key] !== "" || userEdit.user[key] === "" || Object.keys(userEdit.user).length === 0) {
                isValid = false
            }
        }
        setUserEdit({
            ...userEdit,
            isValid: isValid
        })
    }
    const history = useHistory()
    const handleSubmit = (event) => {
        event.preventDefault()
        window.confirm(`Vui lòng kiểm tra lại thông tin trước khi chỉnh sửa!!!`) && dispatch(getEditUserAction(userB, history))

    }
    return (
        <form className="form__editUser" onSubmit={handleSubmit}>
            <div className="form__group">
                <label htmlFor="taiKhoan">Tài khoản</label>
                <input disabled required onBlur={handleChange} onChange={handleChange} value={userEdit?.user?.taiKhoan} type="text" name="taiKhoan" id="taiKhoan" />
            </div>
            <div className="form__group">
                <label htmlFor="matKhau">Mật khẩu</label>
                <input required onBlur={handleChange} onChange={handleChange} type="password" name="matKhau" id="matKhau" />
                <p>{userEdit?.error?.matKhau}</p>
            </div>
            <div className="form__group">
                <label htmlFor="checkMatKhau">Nhập lại mật khẩu</label>
                <input required onBlur={handleChange} onChange={handleChange}
                    type="password" name="checkMatKhau" id="checkMatKhau" />
                <p>{userEdit?.error?.checkMatKhau}</p>
            </div>
            <div className="form__group">
                <label htmlFor="email">Email</label>
                <input required onBlur={handleChange} onChange={handleChange} value={userEdit?.user?.email} type="email" name="email" id="email" />
                <p>{userEdit?.error?.email}</p>
            </div>
            <div className="form__group">
                <label htmlFor="soDt">Số Đt</label>
                <input required onBlur={handleChange} onChange={handleChange} value={userEdit?.user?.soDt} type="text" name="soDt" id="soDt" />
                <p>{userEdit?.error?.soDt}</p>
            </div>
            <div className="form__group">
                <label htmlFor="hoTen">Họ Tên</label>
                <input required onBlur={handleChange} onChange={handleChange} value={userEdit?.user?.hoTen} type="text" name="hoTen" id="hoTen" />
                <p>{userEdit?.error?.hoTen}</p>
            </div>
            <div className="form__group">
                <label htmlFor="maLoaiNguoiDung">Loại Người Dùng</label>
                <select required onChange={handleChange} value={userEdit?.user?.maLoaiNguoiDung} type="text" name="maLoaiNguoiDung" id="maLoaiNguoiDung" >
                    <option selected hidden>Vui lòng chọn loại người dùng</option>
                    <option value="QuanTri">Quản Trị</option>
                    <option value="KhachHang">Khách Hàng</option>
                </select>
            </div>
            <div className="submit__form">
                {
                    userEdit?.isValid ?
                        <button className="btn btn-success">Xác nhận</button>
                        :
                        <button disabled className="btn btn-success">Xác nhận</button>
                }
                <button className="btn btn-danger" onClick={() => toggleModal()}>Hủy</button>
            </div>
        </form>
    )
}
