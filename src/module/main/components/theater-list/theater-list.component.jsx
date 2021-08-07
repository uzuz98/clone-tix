import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTheaterCinemaAction, getTheaterListAction, getTheaterShowTimeAction } from '../../../../store/actions/theater.action';
import './theater-list.style.scss'

export default function TheaterList() {
    const [phimTheoCumRap, setPhimTheoCumRap] = useState(
        "bhd-star-cineplex-3-2"
    );

    const dispatch = useDispatch();
    useEffect(() => {
        handleChoiceCinema("BHDStar")
        handleChoiceListCinema("BHDStar")
        dispatch(getTheaterListAction())
        renderCinema()

    }, [])
    const theaterList = useSelector((state) => state.theater.theaterList)
    const theaterCinema = useSelector((state) => state.theater.theaterCinema)
    const listCumRap = useSelector((state) => state.theater.theaterShowTime[0]?.lstCumRap)
    const handleChoiceCinema = (cinema) => {
        dispatch(getTheaterCinemaAction(cinema))
        dispatch(getTheaterShowTimeAction(cinema))

    }
    //Lấy ra cụm rạp và trỏ tới nơi cụm rạp
    const handleChoiceListCinema = (cinema) => {
    }
    const renderLogo = () => theaterList.map((theater, index) => (
        <div className="logo__detail" key={index} >
            <img src={theater.logo} alt="" onClick={() => (handleChoiceCinema(theater.maHeThongRap))} />
        </div>
    ))
    const renderCinema = () => theaterCinema.map((cinema, index) => (
        <div
            className='cinema__detail'
            onClick={() => setPhimTheoCumRap(cinema.maCumRap)}
        >
            <p>{cinema.tenCumRap}</p>
            <p>{cinema.diaChi}</p>
        </div>
    ));
    const timeMovieR = (cine) => {
        return cine.map((r, index) => {
            return (
                <>
                    <span>{r.ngayChieuGioChieu}</span>
                    {console.log("Đây là ngày chiếu giờ chiếu r: ", r.ngayChieuGioChieu)}
                </>
            )
        })
    }
    const rap = listCumRap?.filter(
        (cinema) => cinema.maCumRap === phimTheoCumRap
    );
    const renderShowTime = () => {

        console.log(rap);
        console.log(listCumRap);
        if (rap) {
            if (rap.length > 0) {
                return rap[0]?.danhSachPhim.map((ra, index) => {
                    return (
                        <div>
                            <p>{ra.tenPhim}</p>
                            {console.log("đây là tên phim ra: ", ra.tenPhim)}
                            {timeMovieR(ra.lstLichChieuTheoPhim)}
                        </div>
                    );
                })
            } else {
                return (
                    <div>
                        <p>Không có phim</p>

                    </div>
                )
            }
        }


    }

    return (
        <div className="theater__content">
            <div className="theater__logo">
                {renderLogo()}
            </div>
            <div className="theater__cinema">
                {renderCinema()}
            </div>
            <div className="theater__showtime">
                {/* {renderTime()} */}
                <h1>Showing Time</h1>
                {renderShowTime()}
            </div>
        </div>
    )

}
