import dateFormat from 'dateformat'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getMovieAddAction } from '../../../../store/actions/movie-manage.action'
import "./add-movie.style.scss"
import { getMovieListAction } from '../../../../store/actions/movie.action'
import { useHistory } from 'react-router-dom'
import { GROUP_ID } from '../../../../config/groupid.config'

export default function AddMovie() {
    const dispatch = useDispatch()
    const history = useHistory()
    //movie detiail
    const [movieAdd, setMovieAdd] = useState({
        maPhim: "",
        tenPhim: "",
        trailer: "",
        hinhAnh: {},
        moTa: "",
        ngayKhoiChieu: "",
        maNhom: GROUP_ID,
    })
    //update the movie detail
    const handleChange = (event) => {
        const { id, value } = event.target
        //check if id = hinhAnh will change the value to type file
        if (id === "hinhAnh") {
            setMovieAdd({
                ...movieAdd,
                [id]: event.target.files[0]
            })
            //render the image
            document.getElementById("src__hinhAnh").src = URL.createObjectURL(event.target.files[0])
        } else {
            setMovieAdd({
                ...movieAdd,
                [id]: value
            })
        }
    }
    //call api to create new movie when submit form
    const handleSubmitForm = (event) => {
        event.preventDefault()
        const formData = new FormData()
        for (const key in movieAdd) {
            //change type date of ngayKhoiChieu to dd/mm/yyyy
            if (key === "ngayKhoiChieu") {
                formData.append(key, dateFormat(new Date(movieAdd[key]), 'dd/mm/yyyy'))
            } else {
                formData.append(key, movieAdd[key])
            }
        }
        dispatch(getMovieAddAction(formData, history))
        dispatch(getMovieListAction())

    }
    return (
        <section className="add__movie">
            <h1>Thêm phim mới vào, điền đây đủ thông tin sau đó nhấn nút xác nhận</h1>
            <form onSubmit={handleSubmitForm} className="form">
                <div className="form__group">
                    <label htmlFor="tenPhim">Tên Phim</label>
                    <input required value={movieAdd.tenPhim} onChange={handleChange} className="form__item" type="text" id="tenPhim" />
                </div>
                <div className="form__group">
                    <label htmlFor="trailer">Trailer</label>
                    <input required value={movieAdd.trailer} onChange={handleChange} className="form__item" type="text" id="trailer" />
                </div>
                <div className="form__group">
                    <label htmlFor="hinhAnh">Hình ảnh</label>
                    <input required onChange={handleChange} className="form__item" type="file" id="hinhAnh" />
                </div>
                <img id="src__hinhAnh" style={{ width: 100, height: 100, marginBottom: 30, marginLeft: 150 }} src="#" alt="your image" />

                <div className="form__group">
                    <label htmlFor="moTa" className="description">Mô tả</label>
                    <textarea value={movieAdd.moTa} onChange={handleChange} cols="90" rows="10" className="form__item" type="text" id="moTa" />
                </div>
                <div className="form__group">
                    <label htmlFor="ngayKhoiChieu">Ngày khởi chiếu</label>
                    <input required value={movieAdd.ngayKhoiChieu} onChange={handleChange} className="form__item" type="date" id="ngayKhoiChieu" />
                </div>
                <div className="form__group">
                    <label htmlFor="maNhom">Mã Nhóm</label>
                    <input required disabled value={movieAdd.maNhom} className="form__item" type="text" id="maNhom" />
                </div>
                <div className="submit__form">
                    <button className="btn__submit btn btn-success">Xác nhận</button>
                    <button className="btn__cancel btn btn-danger">Hủy bỏ</button>
                </div>
            </form>
        </section>
    )
}
