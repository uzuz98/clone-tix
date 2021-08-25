import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../../img/ads/logo-chu-T-tpalne_monogram-01_2x.png'
import "./dashboard.style.scss"
export default function Dashboard() {
    const [menuMovie, setMenuMovie] = useState()
    const [menuUser, setMenuUser] = useState()
    const refMovie = useRef()
    const refAcc = useRef()
    if (refMovie.current) {
        if (menuMovie) {
            refMovie.current.style.display = "block"
            refMovie.current.style.opacity = "1"
            refMovie.current.style.height = "70px"
        } else if (!menuMovie) {
            refMovie.current.style.display = "none"
            refMovie.current.style.opacity = "0"
            refMovie.current.style.height = "0px"
        }
    }
    if (refAcc.current) {
        if (menuUser) {
            refAcc.current.style.display = "block"
            refAcc.current.style.opacity = "1"
            refAcc.current.style.height = "70px"
        } else if (!menuUser) {
            refAcc.current.style.display = "none"
            refAcc.current.style.opacity = "0"
            refAcc.current.style.height = "0px"
        }
    }
    return (
        <div className="dashboard__content">
            <div className="dashboard__top">
                <img src={logo} alt="" />
                <span>Dashboard</span>
            </div>
            <div className="dashboard__list">
                <ul>
                    <li>
                        <NavLink to="/admin" activeClassName="dashboard__active" exact="true">Trang chủ</NavLink>
                    </li>
                    <li>
                        <p className="movie__manage" onClick={() => setMenuMovie(!menuMovie)}>Quản lý phim</p>
                        <ul className="movie__manage--menu" ref={refMovie}>
                            <li>
                                <NavLink to="/admin/movie-management/add" activeClassName="dashboard__active" exact="true">Thêm </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/movie-management/edit" activeClassName="dashboard__active" exact="true">Sửa/Tìm kiếm</NavLink>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <p className="user__manage" onClick={() => setMenuUser(!menuUser)}>Quản lý người dùng</p>
                        <ul className="user__manage--menu" ref={refAcc}>
                            <li>
                                <NavLink to="/admin/user-management/add" activeClassName="dashboard__active" exact="true">Thêm</NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/user-management/edit" activeClassName="dashboard__active" exact="true">Sửa/Tìm kiếm</NavLink>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}
