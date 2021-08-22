import React, { useEffect, useState } from 'react'
import Footer from '../main/components/footer/footer.component';
import Header from '../main/components/header/header.page'
import LoadingScreen from '../main/components/loading-screen/loadgin-screen.component';

export default function MainTemplates(props) {
    const { children } = props;
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(true)
        }, 2000);
    }, [])
    return (
        <>
            <header>
                <Header />
            </header>
            <main>
                {!isLoading ?
                    <LoadingScreen /> :
                    children
                }
            </main>
            <footer className="footer">
                <Footer></Footer>
            </footer>
        </>
    )
}
