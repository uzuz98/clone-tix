import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../../../img/ads/logo-chu-T-tpalne_monogram-01_2x.png'
import "./dashboard.style.scss"
export default function Dashboard() {
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
                        <NavLink to="/admin/movie-management" activeClassName="dashboard__active" exact="true">Quản lý phim</NavLink>
                    </li>
                    <li>
                        <NavLink to="/admin/user-management" activeClassName="dashboard__active" exact="true">Quản lý người dùng</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
