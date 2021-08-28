import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getDeleteUserAction, getListUserAction } from '../../../../store/actions/user-manage.action'
import PaginationComponent from '../../../main/components/pagination/pagination.component'
import EditUserModalComponent from '../../component/edit-user-modal/edit-user-modal.component'
import './edit-user.style.scss'

export default function UserEdit() {
    const dispatch = useDispatch()
    const [searching, setSearching] = useState("")
    const [userEdit, setUserEdit] = useState({
        user: {
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
    }
    )
    const [modalDelete, setModalDelete] = useState()
    //call api to get list user infomation
    useEffect(() => {
        dispatch(getListUserAction())
    }, [])
    //get the userList from redux store
    const { userList } = useSelector(state => state.user)
    //search user by username or full name 
    const userListSearching = userList?.filter(user => user?.taiKhoan?.toLowerCase().includes(searching.toLowerCase()) || user?.hoTen?.toLowerCase().includes(searching.toLowerCase()))
    //function to delete a user
    const history = useHistory()
    const handleDelete = (user) => {
        window.confirm(`Bạn có chắc muốn xóa tài khoản:  ${user.taiKhoan}`) && dispatch(getDeleteUserAction(user.taiKhoan, history))
    }
    //create tHead table
    const tHead = () => (
        <>
            <th>Tài Khoản</th>
            <th>Họ Tên</th>
            <th>Email</th>
            <th>Số Đt</th>
            <th>Mật Khẩu</th>
            <th>Loại Người Dùng</th>
            <th>Chức Năng</th>
        </>
    )
    const handleSetUserEdit = (user) => {
        setModalDelete(!modalDelete)
        if (document.getElementById("checkMatKhau")) {
            if (document.getElementById("checkMatKhau").value !== "") {
                document.getElementById("checkMatKhau").value = ""
            }
        }
        setUserEdit({
            ...userEdit,
            user: user,
        })
    }
    const toggleModal = () => {
        setModalDelete(!modalDelete)
    }
    if (!modalDelete) {
        document.getElementById("root").style.overflow = "unset"
        document.getElementById("root").style.height = "unset"
    } else {
        document.getElementById("root").style.overflow = "hidden"
        document.getElementById("root").style.height = "100vh"
    }
    //create tBody table
    const tBody = (user, index) => (
        <tr key={index}>
            <td>{user.taiKhoan}</td>
            <td>{user.hoTen}</td>
            <td>{user.email}</td>
            <td>{user.soDt}</td>
            <td>{user.matKhau}</td>
            <td>{user.maLoaiNguoiDung}</td>
            <td>
                <button className="btn btn-success" onClick={() => handleSetUserEdit(user)}>Sửa</button>
                <button onClick={() => handleDelete(user)} className="btn btn-danger">Xóa</button>
            </td>
        </tr>
    )
    //searching when user type in the search input
    const handleSearching = (event) => {
        const { value } = event.target
        setSearching(value)
    }
    return (
        <>
            <section className="user__edit text-center">
                <div className="user__edit--header">
                    <h3>Sửa/Tìm thông tin người dùng</h3>
                </div>
                <input type="text" onChange={handleSearching} value={searching} placeholder="Tìm thông tin tài khoản theo Tài Khoản hoặc Họ tên người dùng" />
                {
                    userListSearching?.length > 0 ?
                        <PaginationComponent listItem={userListSearching} tHead={tHead} tBody={tBody} /> :
                        <p className="search__error">Không có tài khoản nào trùng với thông tin trên</p>
                }
            </section>
            {
                modalDelete && <div className="modal__useredit">
                    <div className="overlay" onClick={() => toggleModal()}></div>
                    <div className="modal__useredit--content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Tài Khoản</th>
                                    <th>Họ Tên</th>
                                    <th>Email</th>
                                    <th>Số Đt</th>
                                    <th>Mật Khẩu</th>
                                    <th>Loại Người Dùng</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userEdit?.user?.taiKhoan}</td>
                                    <td>{userEdit?.user?.hoTen}</td>
                                    <td>{userEdit?.user?.email}</td>
                                    <td>{userEdit?.user?.soDt}</td>
                                    <td>{userEdit?.user?.matKhau}</td>
                                    <td>{userEdit?.user?.maLoaiNguoiDung}</td>
                                </tr>
                            </tbody>
                        </table>
                        <EditUserModalComponent userEdit={userEdit} setUserEdit={setUserEdit} toggleModal={toggleModal} />
                    </div>
                </div>
            }

        </>
    )
}
