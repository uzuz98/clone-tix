import React from 'react'
import "./ads.style.scss"
import mobile from '../../../../img/ads/mobile.png'
import { adsImg } from '../../../../config/ads.config'
import Slider from 'react-slick'


export default function Ads() {
    const renderImg = () => adsImg.map((src, index) => {
        return (
            <img src={src.src} key={Math.random()} alt="" />
        )
    })
    const settings = {
        dots: false,
        infinite: true,
        autoplay: false,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    }
    return (

        <div className="container">
            <div className="ads__content">
                <div className="row">
                    <div className="col-12 col-lg-6 text-center text-lg-left ">
                        <p className="ads__title">
                            Ứng dụng tiện lợi dành cho
                        </p>
                        <p className="ads__title">
                            người yêu điện ảnh
                        </p>
                        <br />
                        <p className="ads__subtitle">
                            Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.
                        </p>
                        <br />
                        <button className="btnDownload">App miễn phí - Tải về ngay!
                        </button>
                        <p className="text__underbutton">
                            TIX có hai phiên bản
                            <a href="#!">
                                iOS
                            </a> &amp;
                            <a href="#!">
                                Android
                            </a>
                        </p>
                    </div>

                    <div className="col-12 col-lg-6 ads__app">
                        <img className="ads__mobile" src={mobile} alt="" />
                        <div className="ads__carousel">
                            <Slider {...settings}>
                                {renderImg()}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
