import React, { useRef, useState } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import avatar from '../../../../img/avatar.png'
import menu from '../../../../img/images.png'
import './header.style.scss'

export default function HeaderAdmin() {
    let user = localStorage.getItem("hoTen")
    const [menuShow, setMenuShow] = useState()
    const refMenu = useRef()
    if (refMenu.current) {
        if (menuShow) {
            refMenu.current.style.opacity = "1"
        } else {
            refMenu.current.style.opacity = "0"
        }
    }
    const history = useHistory()
    const handleLogOut = () => {
        localStorage.clear()
        alert("Đăng xuất thành công")
        history.push("/")
    }
    return (
        <section className="header__admin--info">
            <h3>Xin chào, <span>{user}</span></h3>
            <img src={avatar} className="admin__logo" alt="" />
            <img src={menu} className="toggle__menu" onClick={() => setMenuShow(!menuShow)} alt="" />
            <div className="info__menu" ref={refMenu}>
                <NavLink to="/">Trang chủ</NavLink>
                <p onClick={handleLogOut}>Đăng xuất</p>
            </div>

        </section>
    )
}
