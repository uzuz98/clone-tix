import React from 'react'
import './home.style.scss'

export default function HomeAdmin() {
    let user = localStorage.getItem("hoTen")
    return (
        <section className="home__admin">
            <h1>Xin chào, <span>{user}</span></h1>
            <h2>Hãy chọn 1 mục ở cột <span>bên trái</span> để quản lý nhé !!!</h2>
        </section>
    )
}
