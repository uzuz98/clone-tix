import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../../img/ads/logo-chu-T-tpalne_monogram-01_2x.png'
import "./dashboard.style.scss"
import images from '../../../../img/images.png'

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
    const [overlay, setOverlay] = useState(false)
    const refOverLay = useRef()
    const refDashBoard = useRef()
    const toggleShowMenu = () => {
        setOverlay(!overlay)
        if (!overlay) {
            refOverLay.current.style.width = "100%"
            refDashBoard.current.style.width = "200px"
            refDashBoard.current.style.left = "0"
            document.getElementById("root").style.overflow = "hidden"
            document.getElementById("root").style.height = "100vh"
        } else {
            refOverLay.current.style.width = "0"
            refDashBoard.current.style.width = "0"
            refDashBoard.current.style.left = "-20%"
            document.getElementById("root").style.overflow = "unset"
            document.getElementById("root").style.height = "unset"
        }

    }
    const toggleHideMenu = () => {
        document.getElementById("root").style.overflow = "unset"
        document.getElementById("root").style.height = "unset"
    }
    return (
        <>
            <div onClick={toggleShowMenu} className="button__showdashboard">
                <img src={images} style={{ width: 30, cursor: "pointer" }} alt="" />
            </div>
            <div onClick={toggleShowMenu} className="overlay__dashboard" ref={refOverLay}></div>
            <div className="dashboard__content" ref={refDashBoard}>
                <div className="dashboard__top">
                    <img src={logo} alt="" />
                    <span>Dashboard</span>
                </div>
                <div className="dashboard__list">
                    <ul>
                        <li>
                            <NavLink to="/admin" activeClassName="dashboard__active" exact={true}>Trang chủ</NavLink>
                        </li>
                        <li>
                            <p className="movie__manage" onClick={() => setMenuMovie(!menuMovie)}>Quản lý phim</p>
                            <ul className="movie__manage--menu" ref={refMovie}>
                                <li>
                                    <NavLink onClick={() => toggleHideMenu()} to="/admin/movie-management/add" activeClassName="dashboard__active" exact={true}>Thêm </NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={() => toggleHideMenu()} to="/admin/movie-management/edit" activeClassName="dashboard__active" exact={true}>Sửa/Tìm kiếm</NavLink>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <p className="user__manage" onClick={() => setMenuUser(!menuUser)}>Quản lý người dùng</p>
                            <ul className="user__manage--menu" ref={refAcc}>
                                <li>
                                    <NavLink onClick={() => toggleHideMenu()} to="/admin/user-management/add" activeClassName="dashboard__active" exact={true}>Thêm</NavLink>
                                </li>
                                <li>
                                    <NavLink onClick={() => toggleHideMenu()} to="/admin/user-management/edit" activeClassName="dashboard__active" exact={true}>Sửa/Tìm kiếm</NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}
