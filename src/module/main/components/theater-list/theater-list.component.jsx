import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getTheaterCinemaAction, getTheaterListAction, getTheaterShowTimeAction } from '../../../../store/actions/theater.action';
import './theater-list.style.scss'

export default function TheaterList() {
    const dispatch = useDispatch();
    useEffect(() => {
        handleChoiceCinema("BHDStar")
        handleChoiceListCinema("BHDStar")
        dispatch(getTheaterListAction())
    }, [])
    const theaterList = useSelector((state) => state.theater.theaterList)
    const theaterCinema = useSelector((state) => state.theater.theaterCinema)
    const listCumRap = useSelector((state) => state.theater.theaterShowTime[0]?.lstCumRap)
    const handleChoiceCinema = (cinema) => {
        dispatch(getTheaterCinemaAction(cinema))
    }
    //Lấy ra cụm rạp và trỏ tới nơi cụm rạp
    const handleChoiceListCinema = (cinema) => {
        dispatch(getTheaterShowTimeAction(cinema))
        console.log(listCumRap);
    }
    let rap = []
    const handleChoiceCinemaShowTime = (e) => {
        rap = listCumRap?.filter(cinema => cinema.maCumRap === e)
        console.log(rap[0]?.danhSachPhim);
    }


    const renderLogo = theaterList.map((theater, index) => (
        <div className="logo__detail" key={index} >
            <img src={theater.logo} alt="" onClick={() => (handleChoiceCinema(theater.maHeThongRap), handleChoiceListCinema(theater.maHeThongRap))} />
        </div>
    ))
    const renderCinema = theaterCinema.map((cinema, index) => (
        <div className="cinema__detail" onClick={() => handleChoiceCinemaShowTime(cinema.maCumRap)}>
            <p>{cinema.tenCumRap}</p>
            <p>{cinema.diaChi}</p>
        </div >
    ))
    const renderTime = rap[0]?.danhSachPhim.map((ra, index) => (
        <div>
            <p>{ra.tenPhim}</p>
            {console.log(ra.tenPhim)}
        </div>
    ))

    return (
        <div className="theater__content">
            <div className="theater__logo">
                {renderLogo}
            </div>
            <div className="theater__cinema">
                {renderCinema}
            </div>
            <div className="theater__showtime">
                {renderTime}
            </div>
        </div>
    )

}
