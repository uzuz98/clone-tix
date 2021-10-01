import dateFormat from 'dateformat'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom'
import { getMovieDeleteAction, getMovieManageAction } from '../../../../store/actions/movie-manage.action'
import { getMovieListAction } from '../../../../store/actions/movie.action'
import PaginationComponent from '../../../main/components/pagination/pagination.component'
import './edit-movie.style.scss'


export default function EditMovie() {
    const dispatch = useDispatch()
    const { movieList } = useSelector(state => state.movie)
    let [count, setCount] = useState(false)

    useEffect(() => {
        dispatch(getMovieListAction())
        setCount(false)
    }, [count === true])
    //define searching input with "" (it mean find all the movie)
    const [searching, setSearching] = useState("")
    //get the movieList on store
    //modal for edit movie
    const [modal, setModal] = useState()
    const [tableModal, setTableModal] = useState()
    //define submit to render the submit button
    const [submit, setSubmit] = useState()
    //modal for delete movie
    const [modalDelete, setModalDelete] = useState()
    const [movieDelete, setMovieDelete] = useState()
    const [rootBody, setRootBody] = useState()
    //function open/close the modal when click and put the movie's info want to delete
    const toggleDelete = (id) => {
        setModalDelete(!modalDelete)
        setMovieDelete(id)
        setRootBody(!rootBody)
    }
    const history = useHistory()
    //function to delete the movie
    const handleDelete = (id) => {
        dispatch(getMovieDeleteAction(id.maPhim))
        setCount(!count)
        setModalDelete(!modalDelete)
        setRootBody(!rootBody)
        alert("Xóa thành công");
    }
    //render the modal delete to delete the movie
    const renderModalDelteMovie = () => {
        if (modalDelete) {
            return (
                <div id="delete" className="modal__delete text-center">
                    <div className="delete__overlay" onClick={toggleDelete}></div>
                    <div className="delete__content">
                        <div className="delete__header">
                            <h3>Vui lòng xác nhận trước khi ấn nút XÓA</h3>
                            <p>Sau khi xác nhận không thể hoàn tác</p>
                            <p>Bạn muốn xóa bộ phim <span>{movieDelete.tenPhim}</span></p>
                            <p>Mã Phim: <span>{movieDelete.maPhim}</span></p>
                        </div>
                        <div className="delete__buton">
                            <button className="btn btn-danger" onClick={() => handleDelete(movieDelete)}>XÓA</button>
                            <button className="btn btn-info" onClick={toggleDelete}>HỦY</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    //create tHead on table
    const tHead = () => (
        <>
            <th>Hình ảnh</th>
            <th>Mã phim</th>
            <th>Tên Phim (Bí danh)</th>
            <th>Trailer</th>
            <th className="list__description">Mô tả</th>
            <th>Ngày khởi chiếu</th>
            <th className="rating">Đánh giá</th>
            <th>Quản lý phim</th>
            <th>Quản lý lịch chiếu</th>
        </>
    )
    //create tBody to table
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
                <button className='btn btn-danger' onClick={() => toggleDelete(movie)}>Xóa</button>

            </td>
            <td>
                <NavLink to={`/admin/schedule/add/${movie.maPhim}`} className='btn btn-success'>Thêm</NavLink>
                <NavLink to={`/admin/schedule/delete/${movie.maPhim}`} className='btn btn-danger'>Xóa</NavLink>
            </td>
            {movieDelete === movie && renderModalDelteMovie()}
        </tr>
    )
    //function open/close the modal when click and put the movie's info want to change
    const toggleModal = (movie) => {
        setModal(!modal)
        setTableModal(movie)
        setRootBody(!rootBody)
    }
    //check if rootbody true then make the body overflow
    if (!rootBody) {
        document.getElementById("root").style.overflow = "unset"
        document.getElementById("root").style.height = "unset"
    } else {
        document.getElementById("root").style.overflow = "hidden"
        document.getElementById("root").style.height = "100vh"
    }

    //take the value of the search input
    const handleSearch = (event) => {
        setSearching(event.target.value)
    }
    //find the movie with the value input search
    const movieListFilter = movieList?.filter(movie =>
        movie?.tenPhim?.toLowerCase().includes(searching.toLowerCase())
        ||
        movie.maPhim?.toString().includes(searching)
    )
    //DOM to the submit button
    const submitRef = useRef()
    //hide/show the submit button when clicked
    const toggleSubmit = () => {
        setSubmit(!submit)
    }
    //check if the submit is true then show the button
    if (submitRef.current) {
        if (submit) {
            submitRef.current.style.display = "block"
        } else { submitRef.current.style.display = "none" }
    }
    //take the value of the input to put it to state
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
    //sub mit form and make a form data to sent it to server and close the modal
    const handleSumbitForm = (event) => {
        event.preventDefault()
        let formData = new FormData()
        for (let key in tableModal) {
            if (key !== "hinhAnh") {
                formData.append(key, tableModal[key])
            } else if (tableModal.hinhAnh !== null) {
                formData.append("File", tableModal.hinhAnh)
            }
        }
        dispatch(getMovieManageAction(formData, history))
    }

    return (
        <div className="movie__management">
            <div className="movie__management--list">
                <p className="text-center movie__manage--header">Danh sách phim đang chiếu</p>
                <div className="movie__management--list-content">
                    <div className="movie__manage--action">
                        <input
                            type="search"
                            value={searching}
                            onChange={handleSearch}
                            placeholder="Tìm phim theo tên/mã Phim" />
                    </div>
                    {/* check the list filter if correct will show the result, show p tag if can't find anything */}
                    {
                        movieListFilter?.length > 0 ?
                            <PaginationComponent listItem={movieListFilter} tHead={tHead} tBody={tBody} />
                            :
                            <p className="error__search"
                            >Không tìm thấy kết quả tương ứng.
                                <br />
                                <span>Vui lòng nhập lại với tên phim khác</span></p>
                    }
                    {/* setting the div modal to show */}
                    {
                        modal && <div className="movie__manage--modal">
                            <div className="overlay__modal" onClick={toggleModal}></div>
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
                                            <td><img src={tableModal?.hinhAnh} style={{ width: 140, height: 140 }} alt="" /></td>
                                            <td>{tableModal?.maPhim}</td>
                                            <td>{tableModal?.tenPhim}</td>
                                            <td>{tableModal?.biDanh}</td>
                                            <td>
                                                <a href={tableModal?.trailer}>Play</a>
                                            </td>
                                            <td className="description">{tableModal?.moTa}
                                            </td>
                                            <td>{tableModal?.ngayKhoiChieu}</td>
                                            <td>{tableModal?.danhGia}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <form action="" onSubmit={handleSumbitForm} className="form row text-center">
                                    <div className="form__group col-12 col-sm-6">
                                        <label htmlFor="hinhAnh" >Hình Ảnh</label>
                                        <input name="hinhAnh" type="file" id="hinhAnh" onChange={handleChange} />
                                    </div>
                                    <div className="form__group col-12 col-sm-6">
                                        <label htmlFor="tenPhim">Tên Phim</label>
                                        <input name="tenPhim" value={tableModal?.tenPhim} type="text" id="tenPhim" onChange={handleChange} />
                                    </div>
                                    <div className="form__group col-12 col-sm-6">
                                        <label htmlFor="biDanh">Bí Danh</label>
                                        <input name="biDanh" value={tableModal?.biDanh} type="text" id="biDanh" onChange={handleChange} />
                                    </div>
                                    <div className="form__group col-12 col-sm-6">
                                        <label htmlFor="trailer">Trailer</label>
                                        <input name="trailer" value={tableModal?.trailer} type="text" id="trailer" onChange={handleChange} />
                                    </div>
                                    <div className="form__group col-12 col-sm-6">
                                        <label htmlFor="moTa">Mô Tả</label>
                                        <textarea name="moTa" value={tableModal?.moTa} name="moTa" id="moTa" cols="68" rows="10" onChange={handleChange}></textarea>
                                    </div>
                                    <div className="form__group col-12 col-sm-6">
                                        <label htmlFor="ngayKhoiChieu">Ngày Khởi Chiếu
                                            <p>(yyyy/mm/ddThh:mm:ss)</p></label>
                                        <input name="ngayKhoiChieu" value={tableModal?.ngayKhoiChieu} type="text" id="ngayKhoiChieu" onChange={handleChange} />
                                    </div>

                                    <div className="form__group col-12 col-sm-6">
                                        <label htmlFor="danhGia">Đánh Giá
                                            <p>(từ 1 đến 10)</p></label>
                                        <input name="danhGia" value={tableModal?.danhGia} type="number" min="1" max="10" id="danhGia" onChange={handleChange} />
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
                </div>
            </div>
        </div>
    )
}
