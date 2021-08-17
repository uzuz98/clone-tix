import React from 'react'
import Footer from '../components/footer/footer.component';
import Header from '../components/header/header.page'

export default function MainTemplates(props) {
    const { children } = props;
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                {children}
            </main>
            <footer className="footer">
                <Footer></Footer>
            </footer>
        </>
    )
}
