import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getMovieDetailAction } from "../../../../store/actions/movie.action";
import ShowTime from "../../components/show-time/showtime.component";
import MovieInfo from "../../components/movie-info/movie-info.component";
import MovieDetailInfo from "../../components/movie-detail-info/movie-detail-info.component";
import "./movie-detail.style.scss"
import LoadingScreen from "../../components/loading-screen/loadgin-screen.component";
import { getSearchMovieAction } from "../../../../store/actions/search.action";

export default function MovieDetail() {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSearchMovieAction(id))
    dispatch(getMovieDetailAction(id, isLoading, setIsLoading));
    window.scrollTo(0, 0)
  }, []);

  const { id } = useParams();
  const movieDetail = useSelector((state) => state.movie.movieDetail);

  return (
    <>
      {
        !isLoading ?
          <LoadingScreen /> :
          <section className="movie__detail">
            <div className="movie__detail__wrap">
              <MovieInfo movieDetail={movieDetail} />
            </div>
            <div className="movie__showtime">
              <ul className="nav nav-tabs" id="movie__detailTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <a className="nav-link active" id="movie__detail--showtime-tab" data-toggle="tab" href="#movie__detail--showtime" role="tab" aria-controls="movie__detail--showtime" aria-selected="true">Lịch chiếu</a>
                </li>
                <li className="nav-item" role="presentation">
                  <a className="nav-link" id="movie__detail--info-tab" data-toggle="tab" href="#movie__detail--info" role="tab" aria-controls="movie__detail--info" aria-selected="false">Thông tin Phim</a>
                </li>
              </ul>
              <div className="tab-content" id="movie__detailTabContent">
                <div className="tab-pane fade show active" id="movie__detail--showtime" role="tabpanel" aria-labelledby="movie__detail--showtime-tab">
                  <ShowTime />
                </div>
                <div className="tab-pane fade" id="movie__detail--info" role="tabpanel" aria-labelledby="movie__detail--info-tab">
                  <MovieDetailInfo movieDetail={movieDetail} />
                </div>
              </div>
            </div>
          </section>
      }




    </>
  );
}
