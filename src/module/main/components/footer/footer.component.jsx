import React from 'react'
import "./footer.style.scss"
import coop20 from '../../../../img/ads/coop20.jpg'
import bocongthuong from '../../../../img/ads/bocongthuong.png'


export default function Footer() {
    return (
        <div className="container">
            <div className="footer__top">
                <p className="footer__top--title">
                    <a href="#!">
                        Bạn có câu hỏi? Liên hệ với chúng tôi.
                    </a>
                </p>
                <ul className="footer__list">
                    <li className="footer__item">
                        <a href="#!">
                            Câu hỏi thường gặp
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Trung tâm trợ giúp
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Tài khoản
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Quan hệ với nhà đầu tư
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Việc làm
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Điều khoản sử dụng
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Quyền riêng tư
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Tùy chọn cookie
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Thông tin đối tác
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Liên hệ với chúng tôi
                        </a>
                    </li>
                    <li className="footer__item">
                        <a href="#!">
                            Thông báo pháp lý
                        </a>
                    </li>
                </ul>
            </div>
            <div className="footer__bottom">
                <div className="row">
                    <div className="col-md-1 text-center text-md-left mb-3">
                        <a href="#!">
                            <img className="imgZion" src={coop20} alt="zion" />
                        </a>
                    </div>
                    <div className="col-md-9 text-md-left text-center">
                        <span>
                            TIX – SẢN PHẨM CỦA CÔNG TY CỔ PHẦN ZION
                        </span>
                        <span>
                            Địa chỉ: Z06 Đường số 13, Phường Tân Thuận Đông, Quận 7, Tp. Hồ Chí Minh, Việt Nam.
                        </span>
                        <span>
                            Giấy chứng nhận đăng ký kinh doanh số: 0101659783,
                            <br />đăng ký thay đổi lần thứ 30, ngày 22 tháng 01 năm 2020 do Sở kế hoạch và đầu tư Thành phố Hồ Chí Minh cấp.
                        </span>
                        <span>
                            Số Điện Thoại (Hotline): 1900 545 436
                        </span>
                        <span>Email:
                            <a href="#!">
                                support@tix.vn
                            </a>
                        </span>
                        <span>
                            * Đây là trang web đc clone bởi Hoàng Lê Bảo Thành và Hoàng Trình với mục đích học tập.
                        </span>
                    </div>
                    <div className="col-md-2 text-center text-md-right mt-3 mt-md-0">
                        <a href="#!">
                            <img className="imgBCT" src={bocongthuong} alt="bocongthuong" />
                        </a>
                    </div>
                </div>
            </div>


        </div>
    )
}
