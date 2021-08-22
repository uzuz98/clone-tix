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
import LoadingScreen from '../../components/loading-screen/loadgin-screen.component';


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
    return (
        <div>
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
        </div>
    )

}
