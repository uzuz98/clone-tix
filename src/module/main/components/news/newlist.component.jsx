import React from 'react'
import NewItem from './new-item.component'
import SmallCard from './small-card.component'

export default function NewList(props) {
    const { listnew } = props
    //function to render Hot new
    const renderBigNew = listnew[0].map((news, index) => {
        return (
            <div className="col-12 col-sm-12 col-md-6" key={index}>
                <NewItem news={news}></NewItem>
            </div>
        )
    })
    //function to render second new
    const renderMediumNew = listnew[1].map((news, index) => {
        return (
            <div className="col-12 col-sm-12 col-md-4" key={index}>
                <NewItem news={news}></NewItem>
            </div>
        )
    })
    //function to render mini news
    const renderSmallNew = listnew[2].map((news, index) => {
        return (
            <div className="content" key={index}>
                <SmallCard news={news}></SmallCard>
            </div>
        )
    })

    return (
        <div className="row">
            {renderBigNew}
            {renderMediumNew}
            <div className="col-12 col-sm-12 col-md-4">
                {renderSmallNew}
            </div>
        </div>
    )
}
