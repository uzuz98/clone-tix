import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { getMovieDetailAction } from '../../../../store/actions/movie.action';

export default function MovieDetail() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieDetailAction(id), [])
    })

    const { id } = useParams();
    const movieDetail = useSelector((state) => state.movie.movieDetail)

    return (
        <section className="movie__detail">
            <div className="movie__detail__wrap">
                <div className="row">
                    <div className="col-4">
                        <img src={movieDetail.hinhAnh} alt="" width="100%" />
                    </div>
                    <div className="col-8">
                        <p>Tên Phim: {movieDetail.tenPhim} </p>
                        <p>Mô Tả: {movieDetail.moTa}</p>
                        <p>Đánh giá: {movieDetail.danhGia}</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
