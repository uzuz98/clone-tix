import dateFormat from 'dateformat';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSearchMovieAction } from '../../../../store/actions/search.action';
import "./select-option.style.scss"

export default function SelectOption(props) {
    const { movieList } = props
    const dispatch = useDispatch()
    const [cumRap, setCumRapChieu] = useState("")
    const [maLichChieu, setMaLichChieu] = useState("")
    const { heThongRapChieu } = useSelector(state => state.search.searchingMovie)
    //call api for searching movie by maPhim
    const handleChoiceMovie = (name) => {
        const select = document.getElementById(name).value
        dispatch(getSearchMovieAction(select))
        document.getElementById("theater").value = ""
        document.getElementById("date").value = ""
    }
    //function render list movie name
    const renderOptionMovie = () => movieList.map((movie, index) => {
        return (
            <>
                <option
                    value={movie.maPhim}
                    key={index}

                >
                    {movie.tenPhim}
                </option>
            </>
        )
    })
    //function render list cinema to choice
    const renderOptionCinema = () => heThongRapChieu?.map((theater) => {
        return theater?.cumRapChieu.map((cinema, index) => {
            return (
                <>
                    <option
                        value={cinema.tenCumRap}
                        key={index}
                    >
                        {cinema.tenCumRap}
                    </option>
                </>
            )
        })
    })
    //get the exact movie by the theater system
    const getTimeMovie = heThongRapChieu?.map((theater) => {
        return theater?.cumRapChieu.filter(cinema => cinema.tenCumRap === cumRap)
    })
    //function to render day of movie
    const renderdateMovie = getTimeMovie?.map((listTime) => {
        if (listTime.length > 0) {
            return listTime[0].lichChieuPhim.slice(0, 10).map((time, index) => {
                return (
                    <option value={time.maLichChieu} key={index}>
                        {dateFormat(new Date(time.ngayChieuGioChieu), "ddd dd/mm/yyyy HH:MM")}
                    </option>
                )
            })
        }
    }
    )

    //get the maLichChieu to go to page Booking
    const history = useHistory()
    const submitForm = (event) => {
        event.preventDefault()
        history.push(`/booking/${maLichChieu}`)
    }
    return (
        <form className="search__form" onSubmit={submitForm}>
            <div className="search__group">
                <select
                    required
                    className="search__film"
                    name="search__film"
                    id="film"
                    onChange={() => handleChoiceMovie("film")}
                >
                    <option selected disabled hidden>Vui lòng chọn Phim...</option>
                    {renderOptionMovie()}
                </select>
            </div>
            <div className="search__group">
                <select
                    required
                    className="search__theater"
                    name="search__theater"
                    id="theater"
                    onChange={() => setCumRapChieu(document.getElementById("theater").value)}
                >
                    <option selected disabled hidden value="">Vui lòng chọn Rạp...</option>
                    {renderOptionCinema()}
                </select>
            </div>
            <div className="search__group">
                <select
                    required
                    label="Ngày chiếu..."
                    className="search__date"
                    name="search__date"
                    id="date"
                    onChange={() => setMaLichChieu(document.getElementById("date").value)}
                >
                    <option selected disabled hidden value="">Ngày chiếu...</option>
                    {renderdateMovie}
                </select>
            </div>
            <div className="buy__ticket">
                <button
                    type={maLichChieu === "" ? "button" : "submit"} className={maLichChieu === "" ? "button__buy disabled" : "button__buy"}
                >Mua Vé Ngay</button>
            </div>
        </form >
    )
}
