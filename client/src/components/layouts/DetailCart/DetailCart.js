import React, { useContext } from "react";
import "./DetailCart.css";
import { Link } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import ListProductCart from "./ListProductCart";
import { ProductContext } from "../../../contexts/ProductContext";
function DetailCart() {
  const {
    cartItem,
    setCartItem,
    formatPrice,
    deleteItemCart,
    increaseQuanlity,
    decreaseQuanlity,
    isloading,
  } = useContext(ProductContext);

  const handleTotalPrice = cartItem.reduce((sum, arr) => {
    let result = sum + arr.quanlity * arr.products.Price;
    console.log(result);
    return result;
  }, 0);
  console.log(handleTotalPrice);
  return (
    <div className="detail-cart">
      <Row>
        <Col span={18}>
          <div className="main-left">
            <Col>
              <div className="notify-cart">
                Chọn sản phẩm để tiến hành thanh toán
              </div>
            </Col>
            <Col>
              <div className="content-cart">
                <div className="title-detail">
                  <div>Sản Phẩm</div>
                  <div>Đơn Giá</div>
                  <div>Số Lượng</div>
                  <div>Số Tiền</div>
                  <div>Thao Tác</div>
                </div>
                <div className="list-product">
                  {isloading ? (
                    <Spin size="large" />
                  ) : (
                    cartItem.map((item) => {
                      return (
                        <ListProductCart
                          key={item.id}
                          cartItem={item}
                          formatPrice={formatPrice}
                          deleteItemCart={deleteItemCart}
                          handleTotalPrice={handleTotalPrice}
                          increaseQuanlity={increaseQuanlity}
                          decreaseQuanlity={decreaseQuanlity}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </Col>
          </div>
        </Col>
        <Col span={6}>
          <div className="main-right">
            <div className="title-cart">Chi Tiết Giỏ Hàng</div>
            <div className="wrap-checkout">
              <div className="checkout__item">
                <div>Thành tiền</div>
                <div>{formatPrice.format(handleTotalPrice)}</div>
              </div>
              <div className="checkout__item">
                <div>Phí ship</div>
                <div>10.000</div>
              </div>
              <div className="checkout__item">
                <div>Tổng số tiền</div>
                <div className="total-price__product">
                  {formatPrice.format(handleTotalPrice + 10000)}
                </div>
              </div>
                <button>
              <Link to="/checkout">
                  Thanh Toán
              </Link>
                  </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailCart;
