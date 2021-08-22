import dateFormat from 'dateformat'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../../../store/actions/profile.action'
import "./profile.style.scss"

export default function Profile() {
    const dispatch = useDispatch()
    //get infomation and booking history of the user
    const { profileInfo } = useSelector(state => state.profile)
    useEffect(() => {
        dispatch(getProfileAction())
    }, [])
    //set the first page to vỉew
    const [currentPage, setCurrentPage] = useState(1);
    //set the length of ticket per page
    const [ticketPerPages] = useState(10);
    //find the last ticket
    const indexOfLastTicket = currentPage * ticketPerPages;
    //find the first ticket
    const indexOfFirstTicket = indexOfLastTicket - ticketPerPages;
    //take the last booking to the top
    const profileInfoSorted = profileInfo?.thongTinDatVe?.sort((a, b) => {
        return new Date(dateFormat(new Date(b.ngayDat))) - new Date(dateFormat(new Date(a.ngayDat)))
    })
    //get the current page to view
    const currentTicketPage = profileInfoSorted?.slice(indexOfFirstTicket, indexOfLastTicket);
    const pageNumbers = [];
    const totalPageNumber = Math.ceil(profileInfo?.thongTinDatVe?.length / ticketPerPages)
    //push the page by the total page to the page number for change page
    for (let i = 1; i <= totalPageNumber; i++) {
        pageNumbers.push(i);
    }

    //function to render the button to change page
    const renderBtn = () => pageNumbers.map((number, index) => (
        <button key={index} className={currentPage === number && "active"} onClick={() => setCurrentPage(number)} >
            {number}
        </button>
    ))
    //function to render list ticket per page
    const renderListTicket = () => currentTicketPage?.map((ticket, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{ticket.tenPhim}</td>
                <td className="row">
                    {ticket?.danhSachGhe?.map((chair, indexS) => {
                        return (
                            <>
                                <span key={indexS} className="col-6 col-sm-3">{chair.tenGhe} </span>
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
                <div className="button">
                    {renderBtn()}
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
                        {renderListTicket()}
                    </tbody>
                </table>
            </section>

        </>
    )
}
