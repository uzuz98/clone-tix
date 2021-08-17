import React from 'react'
import { discountNew, hotNew, reviewNew } from '../../../../config/new.config'
import NewList from './newlist.component'
import "./news.style.scss"

export default function News() {
    //function to render section new
    const renderNew = (item) => item.map((listnew, index) => {
        return (
            <div className="new__content" key={index}>
                <NewList listnew={listnew}></NewList>
            </div>
        )
    })
    //function to show more the list new
    const toggleShowMore = () => {
        if (document.querySelector(".active .new__content:nth-child(2)")) {
            document.querySelector(".active .new__content:nth-child(2)").style.display = "block"
            document.querySelector(".show__more").style.display = "none"
            document.querySelector(".btn__hide").style.display = "block"
        }


    }
    //function to hide the list new
    const toggleHide = () => {
        document.querySelector(".active .new__content:nth-child(2)").style.display = "none"
        document.querySelector(".show__more").style.display = "block"
        document.querySelector(".btn__hide").style.display = "none"
    }


    return (
        <>
            <div className="news__title">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Điện ảnh 24h</a>
                        <a className="nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Review</a>
                        <a className="nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">Khuyến Mãi</a>
                    </div>
                </nav>
            </div>
            <div className="tab-content news__tab" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    {renderNew(hotNew)}
                </div>
                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    {renderNew(reviewNew)}
                </div>
                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    {renderNew(discountNew)}
                </div>
            </div>
            <div className="button__viewhide container">
                <button className="btn btn-info show__more" onClick={() => toggleShowMore()}>Xem thêm</button>
                <button className="btn btn-success btn__hide" onClick={() => toggleHide()}>Thu gọn</button>
            </div>
        </>
    )
}
