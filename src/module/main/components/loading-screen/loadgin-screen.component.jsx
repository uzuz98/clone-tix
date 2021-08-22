import React from 'react'
import comp3 from '../../../../img/ads/comp-3.gif'
import './loading-screen.style.scss'

export default function LoadingScreen() {
    return (
        <section className="loading__page">
            <img className="loading__screen" src={comp3} alt="" />
        </section>
    )
}
