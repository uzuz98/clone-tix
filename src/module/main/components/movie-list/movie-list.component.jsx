import dateFormat from 'dateformat'
import React from 'react'
import Slider from 'react-slick';
import CardMovie from '../../components/card-movie/card-movie.component';

export default function MovieList(props) {
    const timeLimit = dateFormat(new Date("06/30/2021"), "mm/dd/yyyy")
    const { movieList } = props
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
    const settings = {
        infinite: false,
        dots: false,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        rows: 2,
        slidesPerRow: 1,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    infinite: false,
                    slidesToShow: 4,
                    rows: 2,
                    arrows: false,
                    dots: true,
                    slidesPerRow: 1,
                    slidesToScroll: 4,
                }
            },
            {
                breakpoint: 736,
                settings: {
                    infinite: false,
                    slidesToShow: 3,
                    rows: 2,
                    slidesPerRow: 1,
                    slidesToScroll: 3,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    infinite: false,
                    slidesToShow: 2,
                    dots: true,
                    autoplay: true,
                    autoplaySpeed: 5000,
                    arrows: false,
                    rows: 4,
                    slidesPerRow: 1,
                    slidesToScroll: 2,
                }
            }
        ]
    }
    return (
        <>
            <div className="card__title">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-link active" id="nav-available-tab" data-toggle="tab" href="#nav-available" role="tab" aria-controls="nav-available" aria-selected="true">
                            <h1 className="text-center">Phim đang chiếu</h1>
                        </a>
                        <a className="nav-link" id="nav-comingsoon-tab" data-toggle="tab" href="#nav-comingsoon" role="tab" aria-controls="nav-comingsoon" aria-selected="false">
                            <h1 className="text-center">Phim sắp chiếu</h1>
                        </a>
                    </div>
                </nav>
            </div>
            <div className="tab-content card__tab" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-available" role="tabpanel" aria-labelledby="nav-available-tab">
                    <div className="container movie__available">
                        <Slider {...settings} className="row list__content">
                            {renderMovieList}
                        </Slider>
                    </div>
                </div>
                <div className="tab-pane fade" id="nav-comingsoon" role="tabpanel" aria-labelledby="nav-comingsoon-tab">
                    <div className="container movie__comingsoon">
                        <Slider {...settings} className="row list__content">
                            {renderComingSoon}
                        </Slider>
                    </div>
                </div>
            </div>


            {/* <h1 className="text-center">Phim đang chiếu</h1>
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
            </div> */}
        </>
    )
}
