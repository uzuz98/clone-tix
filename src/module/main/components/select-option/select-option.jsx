import dateFormat from 'dateformat';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSearchMovieAction } from '../../../../store/actions/search.action';
import "./select-option.style.scss"

export default function SelectOption(props) {
    const { movieList } = props
    const dispatch = useDispatch()
    const [movie, setMovie] = useState("")
    const [cumRap, setCumRapChieu] = useState("")
    const [maLichChieu, setMaLichChieu] = useState("")
    const { heThongRapChieu } = useSelector(state => state.search.searchingMovie)
    //call api for searching movie by maPhim
    const handleChoiceMovie = (name) => {
        const select = document.getElementById(name).value
        dispatch(getSearchMovieAction(select))
        setCumRapChieu("")
        setMaLichChieu("")
        setMovie(select)
    }
    //function render list movie name
    const renderOptionMovie = () => movieList.map((movie) => {
        return (
            <option
                value={movie.maPhim}
                key={Math.random()}

            >
                {movie.tenPhim}
            </option>
        )
    })
    //function render list cinema to choice
    const renderOptionCinema = () => heThongRapChieu?.map((theater) => {
        return theater?.cumRapChieu.map((cinema) => {
            return (
                <option
                    value={cinema.tenCumRap}
                    key={Math.random()}
                >
                    {cinema.tenCumRap}
                </option>
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
                    <option value={time.maLichChieu} key={Math.random()}>
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
                    value={movie}
                    onChange={() => handleChoiceMovie("film")}
                >
                    <option disabled hidden value="">Vui lòng chọn Phim...</option>
                    {renderOptionMovie()}
                </select>
            </div>
            <div className="search__group">
                <select
                    required
                    className="search__theater"
                    name="search__theater"
                    id="theater"
                    value={cumRap}
                    onChange={() => setCumRapChieu(document.getElementById("theater").value)}
                >
                    <option disabled hidden value="">Vui lòng chọn Rạp...</option>
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
                    value={maLichChieu}
                    onChange={() => setMaLichChieu(document.getElementById("date").value)}
                >
                    <option disabled hidden value="">Ngày chiếu...</option>
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
