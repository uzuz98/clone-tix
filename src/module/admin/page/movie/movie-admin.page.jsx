import React from 'react'
import "./movieadmin.stlye.scss"
import avatar from '../../../../img/avatar.png'
import ListMovieManage from '../../component/list-movie-management/list-movie-management.component'

export default function MovieAdmin() {
    return (
        <div className="movie__management">

            <div className="movie__management--list">
                <p className="text-center">Danh sách phim đang chiếu</p>
                <div className="movie__management--list-content">
                    <ListMovieManage></ListMovieManage>
                </div>
            </div>
        </div>
    )
}
