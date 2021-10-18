import React, { useContext, useState, useEffect } from "react";
import { Row, Col } from "antd";
import { useLocation, useHistory } from "react-router-dom";
import "./CheckoutCart.css";
import { AuthContext } from "../../../contexts/AuthContext";
import CheckOutItem from "./CheckOutItem";
import { ProductContext } from "../../../contexts/ProductContext";
import { CheckOutContext } from "../../../contexts/CheckOutContext";
import { Bell } from "react-feather";

const payment = [
  {
    id: 1,
    img: "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg",
    title: "Thanh toán tiền mặt khi nhận hàng",
  },
  {
    id: 2,
    img: "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg",
    title: "Thanh toán bằng ví MoMo",
  },
  {
    id: "3",
    img: "https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg",
    title: "Thanh toán bằng ATM/Internet Banking",
  },
];
const codeOrder = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const code = codeOrder(10000000, 100000000);

function CheckoutCart() {
  const {
    authState: {
      user: { address, country, distinct, firstname, lastname, phone },
    },
  } = useContext(AuthContext);
  const { formatPrice } = useContext(ProductContext);
  const [checked, setChecked] = useState("");
  const location = useLocation();
  const history = useHistory();
  const stateItem = location.state.newarray;
  const totalPrice = location.state.totalPrice;
  const [order, setOrder] = useState({
    id_code: JSON.stringify(code),
    phone: `${phone}`,
    name: `${lastname}${firstname} `,
    cart: stateItem.map((item) => item.id),
    price: JSON.stringify(totalPrice),
    address: `${address}, ${distinct}, ${country}`,
    
  });
  const { orderProducts } = useContext(CheckOutContext);
  console.log(checked);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const submit = await orderProducts(order);
      if (submit) {
        const local ={
          pathname:"/order-success",
          state:{ code }
        }
        history.push(local);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row className="wrap-checkout">
      <Col span={16}>
        <div className="notify-delivery">
          <Bell size={22} />
          Với đơn hàng được đặt trước 18h sẽ được giao hàng trong ngày. Với đơn
          hàng sau 18h sẽ được giao hàng vào ngày tiếp theo !
        </div>
        <div className="main-left">
          <div className="title-order">Thông Tin Đơn Hàng</div>
          {stateItem.map((item, index) => (
            <CheckOutItem data={item} key={item.id} formatPrice={formatPrice} />
          ))}
        </div>
        <div className="card-payment">
          <div className="title-payment">
            <div className="">Hình Thức Thanh Toán</div>
            <div className="notify-payment">
              (Khuyến khích thanh toán trả trước và hạn chế tiếp xúc gần để đề
              phòng COVID19)
            </div>
          </div>
          <div>
            {payment.map((item) => {
              return (
                <div className="payment-item" key={item.id} value={item.title}>
                  <input
                    type="checkbox"
                    checked={checked === item.title}
                    onChange={() => setChecked(item.title)}
                  />
                  <img src={item.img} alt="" />
                  <div>{item.title}</div>
                </div>
              );
            })}
          </div>
        </div>
      </Col>
      <Col span={8}>
        <div className="main-right">
          <div className="card-info__user">
            <div className="title-info">Địa Chỉ Giao Hàng</div>
            <div className="detail-info">
              <div className="name-user">
                {lastname} {firstname}
              </div>
              <div className="address-delivery">
                {address}, {distinct}, {country}
              </div>
              <div className="phone-user">
                Điện thoại: <span>{phone}</span>
              </div>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="card-info__order">
            <div className="title-info">Đơn hàng</div>
            <div>
              <div className="delivery-fee">
                <span>Tạm tính:</span>{" "}
                <span>{formatPrice.format(totalPrice)}</span>
              </div>
              <div className="delivery-fee">
                <span>Phí vận chuyển:</span>{" "}
                <span>{formatPrice.format(10000)}</span>
              </div>
              <div className="total-price__order">
                <span>Tổng tiền:</span>{" "}
                <span>{formatPrice.format(totalPrice + 10000)}</span>
              </div>
            </div>
            <button>Đặt Mua</button>
          </form>
        </div>
      </Col>
    </Row>
  );
}

export default CheckoutCart;
