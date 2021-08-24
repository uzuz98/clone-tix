import React from 'react'
import Dashboard from '../admin/component/dashboard/dashboard.component'
import HeaderAdmin from '../admin/component/header/header.component'

export default function AdminTemplate(props) {
    const { children } = props
    return (
        <section className="row">
            <header className="admin__ col-1">
                <Dashboard></Dashboard>
            </header>
            <main className="admin__main col-11">
                <HeaderAdmin></HeaderAdmin>
                {children}
            </main>
        </section>
    )
}
