import React, { useRef } from 'react'
import avatar from '../../../../img/avatar.png'
import menu from '../../../../img/images.png'
import './header.style.scss'

export default function HeaderAdmin() {
    let user = localStorage.getItem("hoTen")
    const refMenu = useRef()
    const toggleMenu = () => {
        if (refMenu.current.style.opacity === "0") {
            return refMenu.current.style.opacity = "1"
        } else {
            return refMenu.current.style.opacity = "0"
        }
    }
    return (
        <section className="header__admin--info">
            <h3>Xin chào, <span>{user}</span></h3>
            <img src={avatar} className="admin__logo" alt="" />
            <img src={menu} className="toggle__menu" onClick={() => toggleMenu()} alt="" />
            <div className="info__menu" ref={refMenu}>
                <p>Cập nhật thông tin</p>
                <p>Đăng xuất</p>
            </div>

        </section>
    )
}
