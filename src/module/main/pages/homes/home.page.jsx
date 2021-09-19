import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieListAction } from '../../../../store/actions/movie.action';
import Banner from '../../components/bannner/banner.component';
import TheaterList from '../../components/theater-list/theater-list.component';
import { getTheaterShowTimeAction } from '../../../../store/actions/theater.action';
import News from '../../components/news/new.component';
import SelectOption from '../../components/select-option/select-option';
import Ads from '../../components/ads/ads.component';
import MovieList from '../../components/movie-list/movie-list.component';
import "./home.style.scss"
import LoadingScreen from '../../components/loading-screen/loadgin-screen.component';

export default function Home() {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    //call api
    useEffect(() => {
        dispatch(getMovieListAction(setIsLoading, isLoading))
        dispatch(getTheaterShowTimeAction())
    }, [])
    //take the movieList from store
    const movieList = useSelector((state) => state.movie.movieList)
    //setting when scroll the button scroll to Top will appear
    const scrollTopHome = () => {
        const buttonTop = document.querySelector(".button__scrollTopHome")
        if (buttonTop) {
            if (window.scrollY > 120) {
                buttonTop.style.opacity = "0.5"
                buttonTop.style.top = "83%"
            } else {
                buttonTop.style.opacity = "0"
                buttonTop.style.top = "-15%"
            }
        }
    }
    window.addEventListener("scroll", scrollTopHome)
    //function scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }
    return (
        <div>
            {
                !isLoading ? <LoadingScreen /> :
                    <>
                        <div onClick={scrollToTop} className="button__scrollTopHome">
                            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M177 255.7l136 136c9.4 9.4 9.4 24.6 0 33.9l-22.6 22.6c-9.4 9.4-24.6 9.4-33.9 0L160 351.9l-96.4 96.4c-9.4 9.4-24.6 9.4-33.9 0L7 425.7c-9.4-9.4-9.4-24.6 0-33.9l136-136c9.4-9.5 24.6-9.5 34-.1zm-34-192L7 199.7c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l96.4-96.4 96.4 96.4c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9l-136-136c-9.2-9.4-24.4-9.4-33.8 0z"></path></svg>
                        </div>
                        <section className="best__movie">
                            <Banner />
                        </section>
                        <section className="searching container">
                            <SelectOption movieList={movieList}></SelectOption>
                        </section>
                        <section className="list__movie" id="listMovie">
                            <MovieList movieList={movieList}></MovieList>
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
                    </>
            }
        </div>
    )

}
