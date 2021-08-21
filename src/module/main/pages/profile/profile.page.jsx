import dateFormat from 'dateformat'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../../../store/actions/profile.action'
import "./profile.style.scss"
import background from '../../../../img/ads/background.jpg'

export default function Profile() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProfileAction())
    }, [])
    const { profileInfo } = useSelector(state => state.profile)
    const renderBookingList = () => profileInfo.thongTinDatVe?.map((ticket, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{ticket.tenPhim}</td>
                <td className="row">
                    {ticket?.danhSachGhe?.map((chair, num) => {
                        return (
                            <>
                                <span key={num} className="col-3">{chair.tenGhe} </span>
                            </>
                        )
                    })}
                </td>
                <td>{dateFormat(new Date(ticket.ngayDat), "dd/mm/yyyy HH:MM")}

                </td>
                <td>
                    {ticket.giaVe * ticket.danhSachGhe.length}
                </td>
                <td>{ticket.maVe}</td>
            </tr>
        )
    })
    return (
        <>

            <section className="profile__user text-center">
                <p>Thông tin cá nhân</p>
                <div className="user__content">
                    <div className="user__item row">
                        <span className="col-6">Họ tên</span>
                        <span className="col-6">{profileInfo.hoTen}</span>
                    </div>
                    <div className="user__item row">
                        <span className="col-6">Tài khoản</span>
                        <span className="col-6">{profileInfo.taiKhoan}</span>
                    </div>
                    <div className="user__item row">
                        <span className="col-6">Số Điện Thoại</span>
                        <span className="col-6">{profileInfo.soDT}</span>
                    </div>
                    <div className="user__item row">
                        <span className="col-6">Email</span>
                        <span className="col-6">{profileInfo.email}</span>
                    </div>
                </div>
            </section>
            <section className="profile__booking text-center">
                <div className="profile__booking-title">
                    <p>Thông tin lịch sử đặt vé</p>
                </div>
                <table className="profile__booking-history">
                    <thead className="history__title">
                        <tr>
                            <th>Số thứ tự</th>
                            <th>Tên phim</th>
                            <th>Danh Sách Ghế</th>
                            <th>Ngày giờ đặt</th>
                            <th>Giá vé</th>
                            <th>Mã vé</th>
                        </tr>
                    </thead>
                    <tbody className="history__body">
                        {/* <tr>
                            <td>1</td>
                            <td>Raya</td>
                            <td className="row">
                                <span className="col-3">F1 </span>
                                <span className="col-3">F2 </span>
                                <span className="col-3">F3 </span>
                                <span className="col-3">F4 </span>
                                <span className="col-3">F5 </span>
                                <span className="col-3">F6 </span>
                                <span className="col-3">F7 </span>
                                <span className="col-3">F7 </span>
                                <span className="col-3">F7 </span>
                                <span className="col-3">F7 </span>
                                <span className="col-3">F7 </span>
                            </td>
                            <td>{dateFormat(new Date("2021-08-21T13:42:12.93"), "dd/mm/yyyy HH:MM")}

                            </td>
                            <td>{90000 * 4}</td>
                            <td>65730</td>
                        </tr> */}
                        {renderBookingList()}
                    </tbody>
                </table>
            </section>
        </>
    )
}
