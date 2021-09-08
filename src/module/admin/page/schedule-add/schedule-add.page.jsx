import dateFormat from 'dateformat'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { getMovieDetailAction } from '../../../../store/actions/movie.action'
import { getScheduleCinemAction, getScheduleCreateAction, getScheduleTheaterAction } from '../../../../store/actions/schedule-manage.action'
import LoadingScreen from '../../../main/components/loading-screen/loadgin-screen.component'
import "./schedule-add.style.scss"

export default function ScheduleAdd() {
    const dispatch = useDispatch()
    //take the maPhim from url
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    //declare ticketDetail
    const [ticketDetail, setTicketDetail] = useState({
        maPhim: id,
        ngayChieuGioChieu: {},
        maRap: "",
        giaVe: "",
    })
    const [cinemaTheater, setCinemaTheater] = useState("")
    //call api to get the list theater schedule
    useEffect(() => {
        dispatch(getScheduleTheaterAction())
        dispatch(getMovieDetailAction(id, loading, setLoading))
    }, [])
    const { tenPhim } = useSelector(state => state.movie.movieDetail)
    //take the list theater, cinema from redux store
    const { listTheater } = useSelector(state => state.schedule)
    const { listCinema } = useSelector(state => state.schedule)
    //get the array of list CumRap from list cinema
    const listNumberCinema = listCinema?.filter(cine => cine.maCumRap === cinemaTheater)
    //render list theater for choose
    const renderListTheater = () => listTheater?.map((theater, index) => (
        <option key={index} value={theater.maHeThongRap}>{theater.maHeThongRap}</option>
    ))
    //take the theaterCinema then call api to get the list schedule by cinema
    const getTheaterCinema = (event) => {
        dispatch(getScheduleCinemAction(event.target?.value))
        document.getElementById("maCumRap").value = ""
        document.getElementById("maRap").value = ""
    }
    //take the list cinema for choose
    const renderListCinema = () => listCinema?.map((cinema, index) => (
        <option value={cinema.maCumRap} key={index}>{cinema.tenCumRap}</option>
    ))
    //render the list number of Cinema
    const renderListNumberCinema = listNumberCinema[0]?.danhSachRap.map((cine, index) => (
        <option value={cine.maRap} key={index}>{cine.maRap} - {cine.tenRap}</option>
    ))
    //get the value on the option select
    const handleChange = (event) => {
        const { value, name } = event.target
        if (name === "ngayChieuGioChieu") {
            setTicketDetail({
                ...ticketDetail,
                [name]: dateFormat(new Date(value), "dd/mm/yyyy hh:mm:ss")
            })
        } else {
            setTicketDetail({
                ...ticketDetail,
                [name]: value
            })
        }
    }
    const history = useHistory()
    //submit form then call api to add schedule
    const handleSubmitForm = (event) => {
        event.preventDefault()
        dispatch(getScheduleCreateAction(ticketDetail, history, id))
    }
    return (
        <>
            {
                !loading ? <LoadingScreen /> : (
                    <section className="schedule__add">
                        <div className="schedule__add--header text-center" style={{ width: "100%" }}>
                            <h1>Thêm lịch chiếu vào phim</h1>
                            <h3>Sau khi xác nhận không thể hoàn tác</h3>
                        </div>
                        <div className="schedule__add-content">
                            <p>Phim: <span>{tenPhim}</span></p>
                            <p>Mã Phim: <span>{id}</span></p>
                            <form onSubmit={handleSubmitForm} className="schedule__add--form">
                                <div className="form__group">
                                    <label htmlFor="heThongRap">Hệ thống rạp</label>
                                    <select onChange={getTheaterCinema} required className="form__value" type="text" id="heThongRap" name="ngayChieuGioChieu" >
                                        <option selected disabled hidden>Vui lòng chọn Hệ Thống Rạp...</option>
                                        {renderListTheater()}
                                    </select>
                                </div>
                                <div className="form__group">
                                    <label htmlFor="maCumRap">Cụm rạp</label>
                                    <select onChange={() => setCinemaTheater(document.getElementById("maCumRap").value)} required className="form__value" type="text" id="maCumRap" name="maCumRap" >
                                        <option selected disabled hidden value="">Vui lòng chọn Cụm Rạp...</option>
                                        {renderListCinema()}
                                    </select>
                                </div>
                                <div className="form__group">
                                    <label htmlFor="maRap" >Mã rạp</label>
                                    <select required className="form__value" type="text" id="maRap" name="maRap" onChange={handleChange}>
                                        <option selected disabled hidden value="">Vui lòng chọn Mã Rạp...</option>
                                        {renderListNumberCinema}
                                    </select>
                                </div>
                                <div className="form__group">
                                    <label htmlFor="ngayChieuGioChieu">Ngày chiếu giờ chiếu</label>
                                    <input required className="form__value" type="datetime-local" id="ngayChieuGioChieu" name="ngayChieuGioChieu" onChange={handleChange} />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="giaVe">Giá Vé</label>
                                    <select required className="form__value" type="text" id="giaVe" name="giaVe" onChange={handleChange}>
                                        <option value="">Vui lòng chọn giá vé...</option>
                                        <option value={75000}>75000</option>
                                        <option value={80000}>80000</option>
                                        <option value={90000}>90000</option>
                                        <option value={120000}>120000</option>
                                    </select>
                                </div>
                                <div className="form__group submit">
                                    <button className="btn btn-success">Xác nhận</button>
                                    <NavLink to="/admin/movie-management/edit" className="btn btn-danger">Quay lại</NavLink>
                                </div>
                            </form>
                        </div>
                    </section>
                )
            }

        </>
    )
}
