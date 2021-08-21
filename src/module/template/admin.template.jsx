import React from 'react'

export default function AdminTemplate(props) {
    const { children } = props
    return (
        <>
            <header>
                <h1>Header</h1>
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
