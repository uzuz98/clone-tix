import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSearchMovieAction } from '../../../../store/actions/search.action';
import "./select-option.style.scss"

export default function SelectOption(props) {
    const { movieList } = props
    const dispatch = useDispatch()
    const [cumRap, setCumRapChieu] = useState("")
    const [ngayChieuGioChieu, setNgayChieuGioChieu] = useState("")
    const { heThongRapChieu } = useSelector(state => state.search.searchingMovie)
    //call api for searching movie by maPhim
    const handleChoiceMovie = (name) => {
        const select = document.getElementById(name).value
        dispatch(getSearchMovieAction(select))
        console.log(heThongRapChieu);
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
    //
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

    const getTimeMovie = heThongRapChieu?.map((theater) => {
        return theater?.cumRapChieu.filter(cinema => cinema.tenCumRap === cumRap)
    })
    console.log(getTimeMovie);
    const renderdateMovie = getTimeMovie?.map((listTime) => {
        if (listTime.length > 0) {
            return listTime[0].lichChieuPhim.slice(0, 10).map((time, index) => {
                return (
                    <option value={time.ngayChieuGioChieu} key={index}>
                        {dateFormat(new Date(time.ngayChieuGioChieu), "ddd dd/mm/yyyy HH:MM")}
                    </option>
                )
            })
        }
    }
    )
    const history = useHistory()
    const submitForm = (event) => {
        event.preventDefault()
        console.log("success");
        history.push("/sign-in")
    }
    console.log(ngayChieuGioChieu);
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
                    <option not-required selected disabled hidden>Vui lòng chọn Phim...</option>
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
                    <option selected disabled hidden>Vui lòng chọn Rạp...</option>
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
                    onChange={() => setNgayChieuGioChieu(document.getElementById("date").value)}
                >
                    <option selected disabled hidden value="">Ngày chiếu...</option>
                    {renderdateMovie}
                </select>
            </div>
            <div className="buy__ticket">
                <button
                    type={ngayChieuGioChieu === "" ? "button" : "submit"} className={ngayChieuGioChieu === "" ? "button__buy disabled" : "button__buy"}
                >Mua Vé Ngay</button>
            </div>
        </form >
    )
}
