import React, { useState } from 'react'

export default function PaginationComponent(props) {
    const { listItem, tHead, tBody, tableName, headName, bodyName } = props
    //set current page
    const [pageToView, setPageToView] = useState(1)
    //set amount of post per page
    const [postPerPage] = useState(10)
    //get the index of first movie and last movie
    const indexOfLastTicket = pageToView * postPerPage;
    const indexOfFirstTicket = indexOfLastTicket - postPerPage
    //creat a array to render the button change page
    let pageNumber = []
    //count the total page to view
    const totalPage = Math.ceil(listItem?.length / postPerPage)
    //push the page number by the total page to view
    for (let i = 1; i <= totalPage; i++) {
        pageNumber.push(i)
    }
    //function to render the button to chagne page
    const renderBtnChangePage = () => pageNumber?.map((number, index) => (
        <button key={Math.random() * index} className={`btn ${pageToView === number ? `btn-danger` : `btn-info`}`} onClick={() => setPageToView(number)}>{number}</button>
    ))
    //take the item per page to view
    const currentPageToView = listItem?.slice(indexOfFirstTicket, indexOfLastTicket)
    //render the page to view
    const renderMovieListPerPage = () => currentPageToView?.map((movie, index) => (
        tBody(movie, index)
    ))
    return (
        <>
            <div className="btn__change">
                {renderBtnChangePage()}
            </div>
            <table className={tableName}>
                <thead className={headName}>
                    <tr>
                        {tHead()}
                    </tr>
                </thead>
                <tbody className={bodyName}>
                    {renderMovieListPerPage()}
                </tbody>
            </table>
            <div className="btn__change">
                {renderBtnChangePage()}
            </div>
        </>
    )
}
