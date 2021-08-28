import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getMovieDetailAction } from '../../../../store/actions/movie.action'
import LoadingScreen from '../../../main/components/loading-screen/loadgin-screen.component'
import PaginationComponent from '../../../main/components/pagination/pagination.component'
import './schedule-delete.style.scss'

export default function ScheduleDelete() {
    const dispatch = useDispatch()
    const [search, setSearch] = useState("")
    const { id, tenPhim } = useParams()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        dispatch(getMovieDetailAction(id, loading, setLoading))
    }, [])
    //get movieDetail form store
    const { movieDetail } = useSelector(state => state.movie)
    //search the movie by the maRap or tenCumRap
    const movieDetailList = movieDetail?.lichChieu?.filter(movie => movie.maRap.toString().includes(search) || movie?.thongTinRap?.tenCumRap.toLowerCase().includes(search.toLowerCase()))
    const tHead = () => (
        <>
            <th>Tên Rạp</th>
            <th>Mã Lịch Chiếu</th>
            <th>Mã Rạp</th>
            <th>Ngày Chiếu Giờ Chiếu</th>
            <th>Chức năng</th>
        </>
    )
    const tBody = (ticket, index) => (
        <tr key={index}>
            <td>{ticket?.thongTinRap?.tenCumRap}</td>
            <td>{ticket.maLichChieu}</td>
            <td>{ticket.maRap}</td>
            <td>{ticket.ngayChieuGioChieu}</td>
            <td>
                <button className="btn btn-danger" onClick={() => handleDelete(ticket)}>Xóa</button>
            </td>
        </tr>
    )
    //not working
    const handleDelete = (ticket) => {
        console.log(ticket);
        alert("Chức năng đang hoàn thiện, vui lòng quay lại sau.")
    }
    //set the value search to search the ticket
    const handleSearch = (event) => {
        const { value } = event.target
        setSearch(value)
    }
    return (
        <>
            {loading ? (
                <section className="schedule__delete">
                    <h1>Vui lòng chọn lịch chiếu cần xóa</h1>
                    <div className="schedule__delete--header ">
                        <p>Tên phim: <span>{tenPhim}</span></p>
                        <p>Mã phim: <span>{id}</span></p>
                    </div>
                    <input onChange={handleSearch} style={{ width: "40%" }} type="text" placeholder="Tìm lịch chiếu theo Mã/Tên rạp" />
                    <div className="schedul__delete--list">
                        <PaginationComponent listItem={movieDetailList} tHead={tHead} tBody={tBody} />
                    </div>
                </section>
            )
                :
                <LoadingScreen></LoadingScreen>
            }
        </>

    )
}
