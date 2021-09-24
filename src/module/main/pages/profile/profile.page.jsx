import dateFormat from 'dateformat'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProfileAction } from '../../../../store/actions/profile.action'
import LoadingScreen from '../../components/loading-screen/loadgin-screen.component'
import PaginationComponent from '../../components/pagination/pagination.component'
import "./profile.style.scss"

export default function Profile() {
    const dispatch = useDispatch()
    //get infomation and booking history of the user
    const { profileInfo } = useSelector(state => state.profile)
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        dispatch(getProfileAction(setIsLoading))
        window.scrollTo(0, 0)
    }, [])
    //take the last booking to the top
    const profileInfoSorted = profileInfo?.thongTinDatVe?.sort((a, b) => {
        return new Date(dateFormat(new Date(b.ngayDat))) - new Date(dateFormat(new Date(a.ngayDat)))
    })
    const tHead = () => (
        <>
            <th>Số thứ tự</th>
            <th>Tên phim</th>
            <th>Danh Sách Ghế</th>
            <th>Ngày giờ đặt</th>
            <th>Giá vé</th>
            <th>Mã vé</th>
        </>
    )
    const tBody = (movie, index) => (
        <tr key={Math.random()}>
            <td>{index + 1}</td>
            <td>{movie.tenPhim}</td>
            <td className="row">
                {movie?.danhSachGhe?.map((chair, indexS) => {
                    const chairStt = (+chair.tenGhe) % 16
                    let rowChair = (+chair.tenGhe / 16);
                    if (rowChair % 1 !== 0) {
                        if (rowChair % 10 >= 0.5) {
                            rowChair = String.fromCharCode(65 + (+rowChair.toFixed(0)) - 1)
                        } else {
                            rowChair = String.fromCharCode(65 + (+rowChair.toFixed(0)))
                        }
                    } else {
                        rowChair = rowChair
                    }
                    return (
                        <span key={indexS} className="col-6 col-sm-3">{rowChair}{chairStt}</span>
                    )
                })}
            </td>
            <td>{dateFormat(new Date(movie.ngayDat), "dd/mm/yyyy HH:MM")}

            </td>
            <td>
                {movie.giaVe * movie.danhSachGhe.length}
            </td>
            <td>{movie.maVe}</td>
        </tr>
    )

    return (<>
        {!isLoading ? <LoadingScreen></LoadingScreen> : (
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
                    <PaginationComponent listItem={profileInfoSorted} tHead={tHead} tBody={tBody} tableName="profile__booking-history" headName="history__title" bodyName="history__body" />
                </section>
            </>
        )
        }
    </>
    )
}
