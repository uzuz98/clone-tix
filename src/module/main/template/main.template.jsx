import React from 'react'
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
            <footer>
                <h5>Footer</h5>
            </footer>
        </>
    )
}
