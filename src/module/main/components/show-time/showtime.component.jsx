import React from "react";
// import dateFormat from "date-format";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
const dateFormat = require("date-format");

function ShowTime() {
  const history = useHistory();
  const lichChieu = useSelector((state) => state.movie.movieDetail.lichChieu);
  console.log("lichChieu : ", lichChieu);
  const renderLichChieu = () =>
    lichChieu?.map((item, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.thongTinRap.tenHeThongRap}</td>
        <td>{item.thongTinRap.tenCumRap}</td>
        <td>{item.giaVe}</td>
        <td>
          {dateFormat("dd/MM/yyyy hh:mm", new Date(item.ngayChieuGioChieu))}
        </td>
        <td>
          <button
            className="btn btn-warning"
            onClick={() => {
              history.push(`/booking/${item.maLichChieu}`);
            }}
          >
            Booking
          </button>
        </td>
      </tr>
    ));
  return (
    <section className="show-time">
      <table className="table">
        <thead>
          <tr>
            <th>số thứ tự</th>
            <th> tên hệ thống rạp </th>
            <th> tên cụm rạp </th>
            <th> giá vé </th>
            <th> ngày chiếu giờ chiếu </th>
            <th>action</th>
          </tr>
        </thead>
        <tbody>{renderLichChieu()}</tbody>
      </table>
    </section>
  );
}

export default ShowTime;
