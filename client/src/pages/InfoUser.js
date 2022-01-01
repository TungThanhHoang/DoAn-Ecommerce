import React, { useContext } from "react";
import "./InfoUser.css";
import { NavLink, useLocation } from "react-router-dom";
import { Edit3, User, Clipboard, Bell, DollarSign } from "react-feather";
import { Row, Col } from "antd";
import DetailUser from "../components/layouts/InfoUser/DetailUser";
import BillOrder from "../components/layouts/InfoUser/BillOrder";
import ChangePassword from "../components/layouts/InfoUser/ChangePassword";
import { AuthContext } from "../contexts/AuthContext";
import Notify from "../components/layouts/InfoUser/Notify";
import DetailBill from "../components/layouts/InfoUser/DetailBill/DetailBill";
function InfoUser({ userRouter }) {
  const location = useLocation();
  const { pathName } = location;
  console.log(pathName);
  const {
    authState: {
      user: { firstname, lastname },
    },
  } = useContext(AuthContext);

  let renderComponent;
  renderComponent = (
    <>
      {userRouter === "infoRouter" && <DetailUser />}
      {userRouter === "billRouter" && <BillOrder />}
      {userRouter === "notifyRouter" && <Notify />}
      {userRouter === "voucherRouter" && <BillOrder />}
      {userRouter === "changePasswordRouter" && <ChangePassword />}
      {userRouter === "detailBill" && <DetailBill />}
    </>
  );
  return (
    <div className="container">
      <Row className="">
        <Col xs={24} sm={24} md={24} lg={6} xl={6}>
          <div className="user-info__left">
            <div className="info-detail">
              <img
                src="https://assets.glxplay.io/static/avatars/Avatar%20Profile-12.png"
                alt=""
              />
              <div className="info-user">
                <div>
                  {lastname} {firstname}
                </div>
                <div>
                  <Edit3 size={18} />
                  <span>Sửa Hồ Sơ</span>
                </div>
              </div>
            </div>
            <NavLink
              to="/user/info"
              className="user-info__item card-menu__item"
            >
              <User className="icon-user" size={20} />
              <span className="title-menu">Tài Khoản Của Tôi</span>
              {/* <div className="menu-sub__user">
                <Link to="/user/info">Hồ Sơ</Link>
                <Link to="/user/change-password">Đổi Mật Khẩu</Link>
              </div> */}
            </NavLink>
            <NavLink
              to="/user/bill"
              className="card-menu__item user-info__item"
            >
              <Clipboard className="icon-bill" size={20} />{" "}
              <span className="title-menu">Đơn Mua</span>
            </NavLink>
            <NavLink
              to="/user/notify"
              className="card-menu__item user-info__item"
            >
              <Bell className="icon-notify" size={20} />
              <span className="title-menu"> Thông Báo</span>
            </NavLink>
            <NavLink
              to="/user/voucher"
              className="card-menu__item user-info__item"
            >
              <DollarSign className="icon-voucher" size={20} />
              <span className="title-menu"> Kho Voucher</span>
            </NavLink>
          </div>
        </Col>
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={18}
          xl={18}
          style={{ marginBottom: "5rem" }}
        >
          <div className="user-info__right">{renderComponent}</div>
        </Col>
      </Row>
    </div>
  );
}

export default InfoUser;
