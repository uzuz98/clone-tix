import dateFormat from 'dateformat'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMovieManageAction } from '../../../../store/actions/movie-manage.action'
import { getMovieListAction } from '../../../../store/actions/movie.action'
import PaginationComponent from '../../../main/components/pagination/pagination.component'
import "./list-movie-management.syle.scss"

export default function ListMovieManage() {
    const dispatch = useDispatch()
    const [searching, setSearching] = useState("")
    const { movieList } = useSelector(state => state.movie)
    const [modal, setModal] = useState()
    const [tableModal, setTableModal] = useState()
    const [submit, setSubmit] = useState()

    useEffect(() => {
        dispatch(getMovieListAction())
    }, [])
    const tHead = () => (
        <>
            <th>Hình ảnh</th>
            <th>Mã phim</th>
            <th>Tên Phim (Bí danh)</th>
            <th>Trailer</th>
            <th className="list__description">Mô tả</th>
            <th>Ngày khởi chiếu</th>
            <th className="rating">Đánh giá</th>
            <th>Chức năng</th>
        </>
    )
    const tBody = (movie, index) => (
        <tr key={index}>
            <td><img src={movie.hinhAnh} style={{ width: 140, height: 140 }} alt="" /></td>
            <td>{movie.maPhim}</td>
            <td>{movie.tenPhim} ({movie.biDanh})</td>
            <td>
                <a href={movie.trailer}>Play</a>
            </td>
            <td className="description">{movie.moTa}</td>
            <td>{dateFormat(new Date(movie.ngayKhoiChieu), "dd/mm/yyyy HH:MM")}</td>
            <td>{movie.danhGia}</td>
            <td>
                <button className='btn btn-success' onClick={() => toggleModal(movie)}>Sửa</button>
                <button className='btn btn-danger'>Xóa</button>
            </td>
        </tr>
    )
    const toggleModal = (movie) => {
        setModal(!modal)
        setTableModal(movie)
    }
    if (!modal) {
        document.getElementById("root").style.overflow = "unset"
    } else {
        document.getElementById("root").style.overflow = "hidden"
    }

    const handleSearch = (event) => {
        setSearching(event.target.value)
    }
    const movieListFilter = movieList?.filter(movie =>
        movie?.tenPhim.toLowerCase().includes(searching.toLowerCase())
    )
    const submitRef = useRef()
    const toggleSubmit = () => {
        setSubmit(!submit)
    }
    if (submitRef.current) {
        if (submit) {
            submitRef.current.style.display = "block"
        } else { submitRef.current.style.display = "none" }
    }

    const handleChange = (event) => {
        const { value, name } = event.target
        if (name === "hinhAnh") {
            setTableModal({
                ...tableModal,
                [name]: event.target.files[0]
            })
        } else {
            setTableModal({
                ...tableModal,
                [name]: value
            })
        }
    }
    const handleSumbitForm = (event, toggle) => {
        event.preventDefault()
        let formData = new FormData()
        for (let key in tableModal) {
            if (key !== "hinhAnh") {
                formData.append(key, tableModal[key])
            } else if (tableModal.hinhAnh !== null) {
                formData.append("File", tableModal.hinhAnh)
            }
        }
        dispatch(getMovieManageAction(formData))
        setModal(toggle)
    }

    return (
        <>
            <div className="movie__manage--action">
                <p className="movie__manage--add">Thêm Phim</p>
                <input
                    type="search"
                    value={searching}
                    onChange={handleSearch}
                    placeholder="Tìm phim theo tên phim...." />
            </div>
            {
                movieListFilter?.length > 0 ?
                    <PaginationComponent listItem={movieListFilter} tHead={tHead} tBody={tBody} />
                    :
                    <p className="error__search"
                    >Không tìm thấy kết quả tương ứng.
                        <p>Vui lòng nhập lại với tên phim khác</p></p>
            }
            {
                modal && <div className="movie__manage--modal">
                    <div className="overlay__modal"></div>
                    <div className="modal__content">
                        <table>
                            <thead>
                                <tr>
                                    <th>Hình ảnh</th>
                                    <th>Mã phim</th>
                                    <th>Tên Phim</th>
                                    <th>Bí danh</th>
                                    <th>Trailer</th>
                                    <th className="list__description">Mô tả</th>
                                    <th>Ngày khởi chiếu</th>
                                    <th className="rating">Đánh giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src={tableModal.hinhAnh} style={{ width: 140, height: 140 }} alt="" /></td>
                                    <td>{tableModal.maPhim}</td>
                                    <td>{tableModal.tenPhim}</td>
                                    <td>{tableModal.biDanh}</td>
                                    <td>
                                        <a href={tableModal.trailer}>Play</a>
                                    </td>
                                    <td className="description">{tableModal.moTa}
                                    </td>
                                    <td>{tableModal.ngayKhoiChieu}</td>
                                    <td>{tableModal.danhGia}</td>
                                </tr>
                            </tbody>
                        </table>
                        <form action="" onSubmit={handleSumbitForm} className="form row text-center">
                            <div className="form__group col-6">
                                <label htmlFor="hinhAnh" >Hình Ảnh</label>
                                <input name="hinhAnh" type="file" id="hinhAnh" onChange={handleChange} />
                            </div>
                            <div className="form__group col-6">
                                <label htmlFor="tenPhim">Tên Phim</label>
                                <input name="tenPhim" value={tableModal.tenPhim} type="text" id="tenPhim" onChange={handleChange} />
                            </div>
                            <div className="form__group col-6">
                                <label htmlFor="biDanh">Bí Danh</label>
                                <input name="biDanh" value={tableModal.biDanh} type="text" id="biDanh" onChange={handleChange} />
                            </div>
                            <div className="form__group col-6">
                                <label htmlFor="trailer">Trailer</label>
                                <input name="trailer" value={tableModal.trailer} type="text" id="trailer" onChange={handleChange} />
                            </div>
                            <div className="form__group col-6">
                                <label htmlFor="moTa">Mô Tả</label>
                                <textarea name="moTa" value={tableModal.moTa} name="" id="moTa" cols="68" rows="10" onChange={handleChange}></textarea>
                            </div>
                            <div className="form__group col-6">
                                <label htmlFor="ngayKhoiChieu">Ngày Khởi Chiếu
                                    <p>(yyyy/mm/ddThh:mm:ss)</p></label>
                                <input name="ngayKhoiChieu" value={tableModal.ngayKhoiChieu} type="text" id="ngayKhoiChieu" onChange={handleChange} />
                            </div>

                            <div className="form__group col-6">
                                <label htmlFor="danhGia">Đánh Giá
                                    <p>(từ 1 đến 10)</p></label>
                                <input name="danhGia" value={tableModal.danhGia} type="number" min="1" max="10" id="danhGia" onChange={handleChange} />
                            </div>
                            <div className="submit__check" ref={submitRef}>
                                <p>Sau khi sửa không thể hoàn tác</p>
                                <p>Hãy xác nhận lại nội dung trước khi nhấn nút Hoàn tất</p>
                                <button type="submit" className="btn btn-success">Hoàn tất</button>
                            </div>
                        </form>
                        <div className="submit__form">
                            <button className="btn btn-info" onClick={toggleSubmit}>
                                Sửa Phim
                            </button>
                            <button className="btn btn-danger" onClick={toggleModal}>Hủy</button>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}
