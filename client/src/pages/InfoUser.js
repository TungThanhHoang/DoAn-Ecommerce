import React, { useContext } from "react";
import "./InfoUser.css";
import { Link } from "react-router-dom";
import { Edit3, User, Clipboard, Bell, DollarSign } from "react-feather";
import { Row, Col, Tabs } from "antd";
import DetailUser from "../components/layouts/InfoUser/DetailUser";
import BillOrder from "../components/layouts/InfoUser/BillOrder";
import ChangePassword from "../components/layouts/InfoUser/ChangePassword";
import { AuthContext } from "../contexts/AuthContext";
const { TabPane } = Tabs;
function InfoUser({ userRouter }) {
  console.log(userRouter);
  const {
    authState: {
      user: { firstname , lastname},
    },
  } = useContext(AuthContext);
  let renderComponent;
  renderComponent = (
    <>
      {userRouter === "infoRouter" && <DetailUser />}
      {userRouter === "billRouter" && <BillOrder />}
      {userRouter === "changePasswordRouter" && <ChangePassword />}
    </>
  );
  return (
    <div className="container">
      <Row className="">
        <Col span={6}>
          <div className="user-info__left">
            <div className="info-detail">
              <img
                src="https://assets.glxplay.io/static/avatars/Avatar%20Profile-12.png"
                alt=""
              />
              <div className="info-user">
                <div>{lastname} {firstname}</div>
                <div>
                  <Edit3 size={18} />
                  <span>Sửa Hồ Sơ</span>
                </div>
              </div>
            </div>
            <Link to="/user/info">
              <div className="user-info__item">
                <User className="icon-user" size={20} />
                <span>Tài Khoản Của Tôi</span>
              </div>
              <div className="menu-sub__user">
                <Link to="/user/info">Hồ Sơ</Link>
                <Link to="/user/change-password">Đổi Mật Khẩu</Link>
              </div>
            </Link>
            <Link to="/user/bill" className="user-info__item">
              <Clipboard className="icon-bill" size={20} /> <span>Đơn Mua</span>
            </Link>
            <div className="user-info__item">
              <Bell className="icon-notify" size={20} />
              <span> Thông Báo</span>
            </div>
            <div className="user-info__item">
              <DollarSign className="icon-voucher" size={20} />
              <span> Kho Voucher</span>
            </div>
          </div>
        </Col>
        <Col span={18} style={{ marginBottom: "5rem" }}>
          <div className="user-info__right">{renderComponent}</div>
        </Col>
      </Row>
    </div>
  );
}

export default InfoUser;
