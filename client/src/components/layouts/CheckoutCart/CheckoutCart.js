import React, { useContext } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./CheckoutCart.css";
import { AuthContext } from "../../../contexts/AuthContext";
import { ProductContext } from "../../../contexts/ProductContext";

function CheckoutCart() {
  const {
    authState: {
      user: { address, country, distinct, firstname, lastname, phone },
    },
  } = useContext(AuthContext);
  const { formatPrice } = useContext(ProductContext);
  return (
    <Row className="wrap-checkout">
      <Col span={16}>
        <div className="notify-delivery">
            Với đơn hàng được đặt trước 18h sẽ được giao hàng trong ngày.
            Với đơn hàng sau khoảng thời gian đó sẽ được giao hàng vào ngày tiếp
            theo !
        </div>
        <div className="main-left">
          <div className="title-order">Thông Tin Đơn Hàng</div>
          <div className="card-product">
            <img className="bg-img" src="../../../nho.jpg" alt="" />
            <div className="info-product">
              <div>Nho khô</div>
              <div>SL: x2</div>
            </div>
            <div className="price-product">44.000</div>
          </div>
          <div className="card-product">
            <img className="bg-img" src="../../../nho.jpg" alt="" />
            <div className="info-product">
              <div>Nho khô</div>
              <div>SL: x2</div>
            </div>
            <div className="price-product">44.000</div>
          </div>
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
            <div className="payment-item">
              <input type="checkbox" />
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                alt=""
              />

              <div>Thanh toán tiền mặt khi nhận hàng</div>
            </div>
            <div className="payment-item">
              <input type="checkbox" />
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-mo-mo.svg"
                alt=""
              />
              <div>Thanh toán bằng ví MoMo</div>
            </div>
            <div className="payment-item">
              <input type="checkbox" />
              <img
                src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-atm.svg"
                alt=""
              />
              <div>Thanh toán bằng ví MoMo</div>
            </div>
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
          <div className="card-info__order">
            <div className="title-info">Đơn hàng</div>
            <div>
              <div className="delivery-fee">
                <span>Tạm tính:</span> <span>{formatPrice.format(20000)}</span>
              </div>
              <div className="delivery-fee">
                <span>Phí vận chuyển:</span>{" "}
                <span>{formatPrice.format(10000)}</span>
              </div>
              <div className="total-price__order">
                <span>Tổng tiền:</span> <span>{formatPrice.format(40000)}</span>
              </div>
            </div>
            <button>Đặt Mua</button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default CheckoutCart;
