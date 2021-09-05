import React from 'react'
import Footer from '../main/components/footer/footer.component';
import Header from '../main/components/header/header.page'

export default function MainTemplates(props) {
    const { children } = props;

    return (
        <>
            <header>
                <Header />
            </header>
            <div style={{ marginBottom: "80px" }}></div>
            <main>
                {
                    children
                }
            </main>
            <footer className="footer">
                <Footer></Footer>
            </footer>
        </>
    )
}
