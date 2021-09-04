
import React, { Component } from 'react'
import { bannerMovie } from '../../../../config/banner.config'
import "./modal.style.scss"
import Slider from 'react-slick'
import ModalCard from './modal.component'
import { NavLink } from 'react-router-dom'

export default class Banner extends Component {
    renderImg = bannerMovie.map((banner, index) => (
        <NavLink to={`movie-detail/${banner.id}`} className="banner__item" key={index}>
            <img src={banner.img} alt="banner movie" className="modalMovie__img" />
            <ModalCard src={banner.src} />
        </NavLink >
    ))
    settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // autoplay: true,
        // autoplaySpeed: 2000,
        dots: true,
    }
    render() {
        return (
            <>
                <Slider {...this.settings}>
                    {this.renderImg}
                </Slider>
            </ >
        )
    }
}
