import dateFormat from 'dateformat'
import React from 'react'
import "./movie-detail-info.style.scss"

export default function MovieDetailInfo(props) {
    const { movieDetail } = props
    return (
        <div className="row movie__detail--info-content" >
            <div className="col-12 col-md-6 info__left">
                <div className="row">
                    <p className="col-6">Ngày công chiếu</p>
                    <p className="col-6">
                        {movieDetail.ngayKhoiChieu &&
                            dateFormat(new Date(movieDetail.ngayKhoiChieu), "dd / mm / yyyy")}
                    </p>
                    <p className="col-6">Đạo diễn</p>
                    <p className="col-6">Lorem, ipsum dolor.</p>
                    <p className="col-6">Diễn viên</p>
                    <p className="col-6">Lorem ipsum dolor sit.</p>
                    <p className="col-6">Thể loại</p>
                    <p className="col-6">Dramma, Vietsub</p>
                    <p className="col-6">Định dạng</p>
                    <p className="col-6">2D/Digital</p>
                    <p className="col-6">Ngôn Ngữ</p>
                    <p className="col-6">Tiếng Việt</p>
                </div>
            </div>
            <div className="col-12 col-md-6 info__right">
                <p>Nội dung</p>
                <p>{movieDetail?.moTa}</p>
            </div>
        </div>
    )
}
