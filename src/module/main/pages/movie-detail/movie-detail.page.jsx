import React, { useEffect, Component } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useParams } from "react-router-dom";
import { withRouter } from "react-router";
import { getMovieDetailAction } from "../../../../store/actions/movie.action";
import ShowTime from "../../components/show-time/showtime.component";
export default function MovieDetail() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMovieDetailAction(id));
  }, []);

  const { id } = useParams();
  const movieDetail = useSelector((state) => state.movie.movieDetail);

  return (
    <section className="movie__detail">
      <div className="movie__detail__wrap">
        <div className="row">
          <div className="col-4">
            <img src={movieDetail.hinhAnh} alt="" width="100%" />
          </div>
          <div className="col-8">
            <p className="movie-detail__name-movie">
              Tên Phim: {movieDetail.tenPhim}{" "}
            </p>
            <p className="movie-detail__description">
              Mô Tả: {movieDetail.moTa}
            </p>
            <p className="movie-detail__danhgia">
              Đánh giá: {movieDetail.danhGia}
            </p>
          </div>
        </div>
        <div>
          <ShowTime />
        </div>
      </div>
    </section>
  );
}
