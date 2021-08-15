import dateFormat from 'dateformat';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { theaterImg } from '../../../../config/theater.config';
import './theater-list.style.scss'

export default function TheaterList() {
    //Define List Cinema by System
    const [phimTheoCumRap, setPhimTheoCumRap] = useState(
        "bhd-star-cineplex-pham-hung",
    );
    console.log(phimTheoCumRap);
    //Define List Cinema
    const [heThongRap, setHeThongRap] = useState(
        "BHDStar"
    )

    //get theaterShowTime on redux
    const theaterShowTime = useSelector(state => state.theater.theaterShowTime)
    const listTheater = theaterShowTime.filter((rap) => rap.maHeThongRap === heThongRap)
    //get the object list cinema system
    const lstCumRap = listTheater[0]?.lstCumRap
    useEffect(() => {
        if (lstCumRap) {
            setPhimTheoCumRap(lstCumRap[0]?.maCumRap)
        }
    }, [heThongRap])
    //function to render the Logo' Cinema
    const renderLogo = () => theaterShowTime.map((cine, index) => {
        return (
            <>
                <div
                    key={index}
                    className={heThongRap === cine.maHeThongRap ? `logo__item active` : `logo__item`}
                    onClick={() => (setHeThongRap(cine.maHeThongRap))}
                >
                    <img src={cine.logo} alt="" />
                </div>
            </>
        )
    })
    //theaterSrc to get the Image of the respective cinema
    const theaterSrc = theaterImg.filter((img) => img.maCumRap === heThongRap)
    //listTheater to get the exact cinema system to render the list Cinema

    //function render the list cinema
    const renderListTheater = () => lstCumRap?.map((cine, index) => {
        return (
            <div className={phimTheoCumRap === cine.maCumRap ? `list__item active` : `list__item`} onClick={() => setPhimTheoCumRap(cine.maCumRap)} key={index}>
                <img src={theaterSrc[0]?.src} alt="" />
                <div className="list__detail">
                    <span>{cine.tenCumRap}</span>
                    <p>{cine.diaChi}</p>
                </div>
            </div>
        )
    })

    //get the present time
    const now = dateFormat(new Date(), "HH:MM")
    //take the exact theater by the cinema system
    const listRap = lstCumRap?.filter((cine) => cine.maCumRap === phimTheoCumRap)
    //function render time by the theater
    const renderShowTime = () => listRap?.map((cine) => {
        return cine.danhSachPhim.slice(0, 4).map((rap, index) => {
            return (
                <div className="time__content" key={index} >
                    <div
                        className="time__header collapsed"
                        data-toggle="collapse"
                        aria-expanded="false"
                        data-parent="#myaccordion"
                        data-target={`#${rap.tenPhim}`}>
                        <img src={rap.hinhAnh} alt="" />
                        <div className="time__name">
                            <span className="name__age">C 13</span>
                            <span className="name__movie">- {rap.tenPhim}</span>
                            <p className="time__detail">116 phút - TIX 8.6 - IMDb 0</p>
                        </div>
                    </div>
                    <div className="row collapse "
                        data-toggle="collapse"
                        aria-expanded="false"
                        id={rap.tenPhim}
                    >
                        <div className="time__item row">
                            <p className="col-12">2D Digital</p>
                            {timeMovieR(rap.lstLichChieuTheoPhim)}
                        </div>
                    </div>
                </div>
            )

        })
    })

    //function to render time of movie
    const timeMovieR = (cine) => {
        return cine.slice(0, 6).map((time, index) => {
            const timeMovie = dateFormat(new Date(time.ngayChieuGioChieu), "HH:MM")
            return (
                <div className="col-4" key={index}>
                    <div className={timeMovie <= now ? "time__showtime disabled" : "time__showtime"}>
                        <span>
                            {timeMovie}
                        </span>
                    </div>
                </div>
            )
        })
    }

    //function to render time of movie in mobile
    const renderListTheaterInMobile = () => lstCumRap?.map((cine, index) => {
        return (
            <div className={phimTheoCumRap === cine.maCumRap ? `list__item active` : `list__item`} onClick={() => setPhimTheoCumRap(cine.maCumRap)} key={index}>
                <img src={theaterSrc[0]?.src} alt="" />
                <div className="list__detail">
                    <span>{cine.tenCumRap}</span>
                    <p>{cine.diaChi}</p>
                </div>
            </div>
        )
    })

    return (
        <div className="theater__content">
            <div className="theater__logo">
                {renderLogo()}
            </div>
            <div className="theater__list">
                {renderListTheater()}
            </div>
            <div className="theater__showtime">
                {renderShowTime()}
            </div>
        </div>
    )

}
