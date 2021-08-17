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
                <h1>Footer</h1>
            </footer>
        </>
    )
}
