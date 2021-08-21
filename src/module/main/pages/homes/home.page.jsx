import React, { useEffect, useRef } from 'react'
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
import Ads from '../../components/ads/ads.component';


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
        infinite: false,
        dots: false,
        autoplay: true,
        autoplaySpeed: 4000,
        arrows: true,
        slidesToShow: 4,
        speed: 500,
        rows: 2,
        slidesPerRow: 1,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    infinite: false,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    autoplay: true,
                    autoplaySpeed: 5000,
                }
            },
            {
                breakpoint: 736,
                settings: {
                    infinite: false,
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    autoplay: false,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    infinite: false,
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    arrows: true,
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }
    const timeLimit = dateFormat(new Date("06/30/2021"), "mm/dd/yyyy")

    const refList = useRef()
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
            <section className="list__movie" id="listMovie" ref={refList}>
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
            <section className="container theater__main" id="theaterMain">
                <TheaterList></TheaterList>
            </section>

            <section className="background__theaterlist"></section>
            <section className="news container" id="news">
                <News></News>
            </section>
            <section className="background__theaterlist"></section>
            <section className="ads" id="ads">
                <Ads></Ads>
            </section>
        </div>
    )
}
