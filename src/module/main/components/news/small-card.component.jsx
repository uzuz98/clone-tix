import React from 'react'

export default function SmallCard(props) {
    const { news } = props
    return (
        <div className="newsblock__item">
            <div className="item__img">
                <a href={news.link} target="_blank" rel="noopener noreferrer">
                    <img src={news.img} alt="tin tuc" style={{ height: 50, objectFit: 'cover' }} />
                </a>
            </div>
            <div className="item__info">
                <h3 className="item__info--title">
                    <a href={news.link} target="_blank" rel="noopener noreferrer">
                        {news.title}
                    </a>
                </h3>
            </div>
        </div>
    )
}
