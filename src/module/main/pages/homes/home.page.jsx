import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick';
import { getMovieListAction } from '../../../../store/actions/movie.action';
import CardMovie from '../../components/card-movie/card-movie.component';
import Banner from '../../components/bannner/banner.component';
import TheaterList from '../../components/theater-list/theater-list.component';

export default function Home() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getMovieListAction())
    }, [])

    const movieList = useSelector((state) => state.movie.movieList)

    const settings = {
        dots: false,
        infinite: false,

        // speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }
    const renderMovieList = movieList.map((movie, index) => (
        <div className="card__item">
            <CardMovie movie={movie} key={index} />
        </div>
    ))
    return (
        <div>
            <div className="best__movie">
                <Banner movieList={movieList} />
            </div>
            <section className="list__movie">
                <h1 className="text-center">Danh sách phim</h1>
                <div className="container">
                    <Slider {...settings} className="row list__content">
                        {renderMovieList}
                    </Slider>
                </div>
            </section>
            <section className="background__theaterlist"></section>
            <section className="container theater__list">
                <TheaterList />
            </section>
        </div>
    )
}
