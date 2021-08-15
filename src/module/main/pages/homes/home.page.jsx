import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from 'react-slick';
import { getMovieListAction } from '../../../../store/actions/movie.action';
import CardMovie from '../../components/card-movie/card-movie.component';
import Banner from '../../components/bannner/banner.component';
import TheaterList from '../../components/theater-list/theater-list.component';
import { getTheaterShowTimeAction } from '../../../../store/actions/theater.action';
import News from '../../components/news/new.component';
import dateFormat from 'dateformat';
import SelectOption from '../../components/select-option/select-option';

export default function Home() {
    const dispatch = useDispatch();
    //call api
    useEffect(() => {
        dispatch(getMovieListAction())
        dispatch(getTheaterShowTimeAction())
    }, [])
    //take the movieList from store
    const movieList = useSelector((state) => state.movie.movieList)
    //settings slick carousel
    const settings = {
        dots: false,
        infinite: true,
        // speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    arrows: false,
                    dots: true
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }
    const timeLimit = dateFormat(new Date("06/30/2021"), "mm/dd/yyyy")

    //function to render Movie List is available now before 30/06/2021
    const renderMovieList = movieList.map((movie, index) => {
        const timeComing = dateFormat(new Date(movie.ngayKhoiChieu), "mm/dd/yyyy")
        const content = "Mua vé"
        if (new Date(timeComing) < new Date(timeLimit))
            return (
                <div className="card__item" key={index} >
                    <CardMovie movie={movie} content={content} />
                </div>
            )
    }
    )
    //function to render movie is coming soon after 30/6/2021
    const renderComingSoon = movieList.map((movie, index) => {
        const timeComing = dateFormat(new Date(movie.ngayKhoiChieu), "mm/dd/yyyy")
        const content = "Sắp Chiếu"
        if (new Date(timeComing) > new Date(timeLimit)) {
            return (
                <div className="card__item" key={index} >
                    <CardMovie movie={movie} content={content} />
                </div>
            )
        }

    })
    return (
        <div>
            <section className="best__movie">
                <Banner />
            </section>
            <section className="searching container">
                <SelectOption movieList={movieList}></SelectOption>
            </section>
            <section className="list__movie">
                <h1 className="text-center">Phim đang chiếu</h1>
                <div className="container movie__available">
                    <Slider {...settings} className="row list__content">
                        {renderMovieList}
                    </Slider>
                </div>
                <h1 className="text-center">Phim sắp chiếu</h1>
                <div className="container movie__comingsoon">
                    <Slider {...settings} className="row list__content">
                        {renderComingSoon}
                    </Slider>
                </div>
            </section>
            <section className="background__theaterlist"></section>
            <section className="container theater__main">
                <TheaterList></TheaterList>
            </section>

            <section className="background__theaterlist"></section>
            <section className="news container">
                <News></News>
            </section>
        </div>
    )
}
