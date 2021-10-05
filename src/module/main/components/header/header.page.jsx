import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import "./header.style.scss"
import avatar from '../../../../img/avatar.png'
import logo from '../../../../img/logo.png'
import images from '../../../../img/images.png'
import { NavHashLink } from 'react-router-hash-link'


export default function Header() {
    //press the title to scroll to title you pressed

    const [overlay, setOverlay] = useState(false)
    const toggleClose = () => {
        setOverlay(!overlay)
        document.querySelector(".navbar__overlay").style.display = "none"
        document.querySelector(".navbar-collapse").classList.remove("show")
    }
    const [logout, setLogout] = useState(false)
    useEffect(() => {
        renderLogin()
        setLogout(!logout)
    }, [logout === true])
    //press the menu to open overlay
    const toggleOverlay = () => {
        setOverlay(!overlay)
        overlay === false ? document.querySelector(".navbar__overlay").style.display = "block" : document.querySelector(".navbar__overlay").style.display = "none"
    }
    //press the logo to scroll to top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        setOverlay(false)
        document.querySelector(".navbar__overlay").style.display = "none"
        document.querySelector(".navbar-collapse").classList.remove("show")
    }
    //add sticky class when scroll out the header
    const scrollSticky = () => {
        const header = document.querySelector(".header")
        if (header) {
            if (window.scrollY > 100) {
                header?.classList?.add("sticky")
            } else {
                header?.classList?.remove("sticky")
            }
        }

    }
    window.addEventListener("scroll", scrollSticky)
    //function to check the user login or not yet
    const renderLogin = () => {
        const hoTen = localStorage.getItem("hoTen")
        const token = localStorage.getItem("token")
        const handleLogOut = () => {
            alert("Đăng xuất thành công")
            localStorage.clear()
            setLogout(!logout)
        }
        if (token) {
            return (
                <>
                    <li className="nav-item">
                        <NavLink to="/profile"
                            className="nav-link sign__item" onClick={() => toggleClose()} >
                            <img src={avatar} alt="" />Xin chào, <span className="header__fullname">{hoTen}</span></NavLink>
                    </li>
                    <li className="nav-item" onClick={() => handleLogOut()}>
                        <span className="nav-link sign__item sign__up">Đăng Xuất</span>
                    </li>
                </>
            )

        } else {
            return (
                <>
                    <li className="nav-item">
                        <NavLink activeClassName="nav-link-active" className="
                                nav-link sign__item" to="/sign-in">
                            <img src={avatar} alt="" />Đăng nhập</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink activeClassName="nav-link-active" className="
                                nav-link sign__item sign__up" to="/sign-up">Đăng ký</NavLink>
                    </li>
                </>)
        }
    }
    return (
        <>
            <nav className="navbar header navbar-expand-lg" >
                <NavLink className="navbar-brand" to="/" onClick={() => scrollToTop()}>
                    <img src={logo} alt="" />
                </NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" onClick={() => toggleOverlay()}>
                    <img src={images} alt="" />
                </button>
                <div className="navbar__overlay" onClick={() => toggleClose()}></div>

                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav sign">
                        {renderLogin()}
                    </ul>
                    <ul className="navbar-nav navbar__menu">
                        <li className="nav-item">
                            <NavHashLink activeClassName="nav-link-active" className="
                                nav-link" onClick={() => toggleClose()} to="/#listMovie" smooth>Lịch Chiếu</NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavHashLink activeClassName="nav-link-active" className="
                                nav-link" onClick={() => toggleClose()} to="/#theaterMain" smooth>Cụm Rạp</NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavHashLink activeClassName="nav-link-active" className="
                                nav-link" onClick={() => toggleClose()} to="/#news" smooth>Tin tức</NavHashLink>
                        </li>
                        <li className="nav-item">
                            <NavHashLink activeClassName="nav-link-active" className="
                                nav-link" onClick={() => toggleClose()} to="/#ads" smooth>Ứng dụng</NavHashLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

