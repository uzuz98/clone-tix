import dateFormat from 'dateformat'
import React from 'react'
import "./movie-info.style.scss"

export default function MovieInfo(props) {
    const { movieDetail } = props
    return (
        <>
            <div className="carousel">
                <img src={movieDetail.hinhAnh} alt="" />
            </div>
            <div className="overlay__info"></div>
            <div className="movie__info">
                <div className="movie__info--img">
                    <img src={movieDetail.hinhAnh} alt="" width="100%" />
                </div>
                <div className="movie__info--name">
                    <p>
                        {movieDetail.ngayKhoiChieu &&
                            dateFormat(new Date(movieDetail.ngayKhoiChieu), "dd / mm / yyyy")}
                    </p>
                    <p className="movie-detail__name-movie">
                        <span>C13</span>
                        {movieDetail.tenPhim}
                    </p>
                    <p>2D Digital</p>
                    <p className="movie-detail__danhgia">
                        Đánh giá: <span>{movieDetail.danhGia}</span>
                    </p>
                </div>
            </div>
        </>
    )
}
