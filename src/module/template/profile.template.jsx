import React from 'react'
import Footer from '../main/components/footer/footer.component';
import Header from '../main/components/header/header.page'

export default function ProfileTemplate(props) {
    const { children } = props;


    return (
        <>
            <header>
                <Header />
            </header>
            <main className="main__profile">
                {
                    children
                }
            </main>
            <footer className="footer__profile">
                <Footer></Footer>
            </footer>
        </>
    )
}
