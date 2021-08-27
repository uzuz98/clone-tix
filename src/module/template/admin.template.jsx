import React from 'react'
import Dashboard from '../admin/component/dashboard/dashboard.component'
import HeaderAdmin from '../admin/component/header/header.component'

export default function AdminTemplate(props) {
    const { children } = props
    return (
        <section className="row admin__template">
            <header className="admin__ col-0 col-md-1">
                <Dashboard></Dashboard>
            </header>
            <main className="admin__main col-12 col-md-11">
                <HeaderAdmin></HeaderAdmin>
                {children}
            </main>
        </section>
    )
}
