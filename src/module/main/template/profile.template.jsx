import React from 'react'
import Footer from '../components/footer/footer.component';
import Header from '../components/header/header.page'

export default function ProfileTemplate(props) {
    const { children } = props;
    return (
        <>
            <header>
                <Header />
            </header>
            <main className="main__profile">
                {children}
            </main>
            <footer className="footer__profile">
                <Footer></Footer>
            </footer>
        </>
    )
}
