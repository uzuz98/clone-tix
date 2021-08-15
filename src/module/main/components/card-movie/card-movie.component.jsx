import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "./card-movie.style.scss"
import ModalCard from '../bannner/modal.component'

export default class CardMovie extends Component {
    render() {

        const { movie, content } = this.props
        return (
            <>
                <Link to={`/movie-detail/${movie.maPhim}`} className="card__link">
                    <div className="card__movie">
                        <div className="cardmovie__item" href="" style={{ backgroundImage: `url(${movie.hinhAnh})` }}>
                        </div>
                        <div className="card-body">
                            <span className="card__age">C13 </span>
                            <span className="card-title">{movie.tenPhim}</span>
                        </div>
                    </div>
                </Link>
                <div className="card__overlay">
                    <ModalCard src={movie.trailer} />
                    <Link to={`/movie-detail/${movie.maPhim}`} className="btn__buyTicket container">
                        {content}
                    </Link>
                </div>
            </ >
        )
    }
}
