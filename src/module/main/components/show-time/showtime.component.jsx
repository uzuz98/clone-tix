import dateFormat from "dateformat";
import React, { useEffect, useState } from "react";
// import dateFormat from "date-format";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./showtime.style.scss"

function ShowTime() {
  //take the lichChieu, heThongRapChieu from store
  const { lichChieu } = useSelector(state => state.movie.movieDetail)
  const { heThongRapChieu } = useSelector(state => state.search.searchingMovie)
  //define state cumRap and dateTime
  const [cumRap, setCumRap] = useState(
    lichChieu[0]?.thongTinRap?.tenHeThongRap
  )
  const [dateTime, setDateTime] = useState()
  //setDateTime when user click on the logo cinema
  useEffect(() => {
    setDateTime(dateByTimeFilter[0])
  }, [cumRap])
  //functoin to render list theater logo and setCumRap when click on the logo
  const renderTheater = () => heThongRapChieu?.map((theater) => (
    <div key={Math.random()} style={{ cursor: "pointer" }} className={cumRap === theater.tenHeThongRap ? `showtime__theater--item active` : `showtime__theater--item`} onClick={() => setCumRap(theater.tenHeThongRap)}>
      <img style={{ width: "50px", padding: "10px 0" }} src={theater.logo} alt="" />
      <span style={{ marginLeft: "10px", color: "black" }}>{theater?.tenHeThongRap?.toUpperCase()}</span>
    </div>
  ))
  //filter list Time by the the cumRap
  const listTimeCinema = lichChieu?.filter((cinema) => cinema.thongTinRap.tenHeThongRap === cumRap)
  //take the date on the listTimeCinema
  const dateByTime = listTimeCinema?.map((time) => {
    const date = new Date(dateFormat(new Date(time?.ngayChieuGioChieu), "mm/dd/yyyy"))
    const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
    return `${month}/${day}/${year}`
  }
  )
  //filter the time and take the same object time
  let dateByTimeFilter = dateByTime.filter((item, index) => dateByTime.indexOf(item) === index);
  //function to render date
  const renderDateByTime = dateByTimeFilter.slice(0, 5).map(date => (
    <div onClick={() => setDateTime(date)} key={Math.random()} className={date === dateTime ? `date__item active` : `date__item`} >
      <p>{(dateFormat(new Date(date), "dddd")).toUpperCase()}</p>
      <p >{date}</p>
    </div>
  ))
  //filter the lichChieu to take the List Time by the date
  const timeCinema = lichChieu?.filter((time) => {
    const date = new Date(dateFormat(new Date(time.ngayChieuGioChieu), "mm/dd/yyyy"))
    const [month, day, year] = [date.getMonth() + 1, date.getDate(), date.getFullYear()]
    const dateCinema = `${month}/${day}/${year}`
    return dateCinema === dateTime && time.thongTinRap.tenHeThongRap === cumRap
  })
  //take the list systeam theater inside the timeCinema
  const listTheaterSystem = timeCinema.map((theater) => theater.thongTinRap.tenCumRap)
  //filter list theater to check the same object
  const listTheaterSystemFilter = listTheaterSystem.filter((theater, index) => listTheaterSystem.indexOf(theater) === index)
  //render the list time cinema by the cinema system
  const renderTimeCinema = (listTime) => listTime.map((theater) => {
    const timeMovie = dateFormat(new Date(theater.ngayChieuGioChieu), "HH:MM")
    return (
      <NavLink key={Math.random()} className="col-4" to={`/booking/${theater.maLichChieu}`}>
        <div className="time__showtime">
          <span>
            {timeMovie}
          </span>
        </div>
      </NavLink>
    )
  })
  const renderListTimeByTheater = listTheaterSystemFilter.map((theater) => {
    //filter list system to get the list time cinema by system
    const timeCinemaFilterSystem = timeCinema.filter(cinema => cinema.thongTinRap.tenCumRap === theater)
    return (
      <div className="time__content" key={Math.random()}>
        <div
          className="time__header collapsed"
          data-toggle="collapse"
          aria-expanded="false"
          data-parent="#myaccordion"
          data-target={`#${theater}`}>
          <div className="time__name">
            <p>{theater}</p>
          </div>
        </div>
        <div className="collapse "
          data-toggle="collapse"
          aria-expanded="false"
          id={theater}
        >
          <div className="time__item row">
            {renderTimeCinema(timeCinemaFilterSystem)}
          </div>
        </div>
      </div>
    )
  })

  //render list show time in the mobile

  return (
    <section className="show-time show-time--pc" >
      <div className="showtime__theater">
        {renderTheater()}
      </div>
      <div className="showtime__date">
        <div className="showtime__date--day">
          {renderDateByTime}
        </div>
        <div className="showtime__date--time">
          {renderListTimeByTheater}
        </div>
      </div>
    </section>
  );
}

export default ShowTime;
