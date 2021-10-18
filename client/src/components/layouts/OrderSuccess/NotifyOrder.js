import React from "react";
import "./NotifyOrder.css";
import { Link , useLocation} from "react-router-dom";
function NotifyOrder() {
  const location = useLocation();
  const idCode = location.state.code;
  return (
    <div className="notify-success">
      <div
        className="img-success bg-img"
        style={{ backgroundImage: "url(../../../delivery-truck.png)" }}
      ></div>
      <span className="code-order">Mã đơn hàng: {idCode} </span>
      <div className="navigation-user">
        <Link to="/user/detail-order"> Chi tiết đơn hàng</Link>
        <Link to="/"> Trở về trang chủ</Link>
      </div>
    </div>
  );
}

export default NotifyOrder;
