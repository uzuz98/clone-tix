import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getListUserAction } from '../../../../store/actions/user-manage.action'
import PaginationComponent from '../../../main/components/pagination/pagination.component'
import './edit-user.style.scss'

export default function UserEdit() {
    const dispatch = useDispatch()
    const [searching, setSearching] = useState("")
    useEffect(() => {
        dispatch(getListUserAction())
    }, [])
    const { userList } = useSelector(state => state.user)
    const userListSearching = userList?.filter(user => user?.taiKhoan?.toLowerCase().includes(searching.toLowerCase()) || user?.hoTen?.toLowerCase().includes(searching.toLowerCase()))
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
    const tBody = (user, index) => (
        <tr key={index}>
            <td>{user.taiKhoan}</td>
            <td>{user.hoTen}</td>
            <td>{user.email}</td>
            <td>{user.soDt}</td>
            <td>{user.matKhau}</td>
            <td>{user.maLoaiNguoiDung}</td>
            <td>
                <button className="btn btn-success">Sửa</button>
                <button className="btn btn-danger">Xóa</button>
            </td>
        </tr>
    )
    const handleSearching = (event) => {
        const { value } = event.target
        setSearching(value)
    }
    return (
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
    )
}
