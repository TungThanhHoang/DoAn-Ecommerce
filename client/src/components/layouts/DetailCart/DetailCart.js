import React, { useContext, useState, useEffect, useMemo } from "react";
import "./DetailCart.css";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Spin, message, Modal } from "antd";
import ListProductCart from "./ListProductCart";
import { ProductContext } from "../../../contexts/ProductContext";
import { CartContext } from "../../../contexts/CartContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
function DetailCart() {
  const {
    cartItem,
    deleteItemCart,
    increaseQuanlity,
    decreaseQuanlity,
    isloading,
  } = useContext(CartContext);
  const { formatPrice } = useContext(ProductContext);
  const [checkOut, setCheckOut] = useState([]);
  const [checkedState, setCheckedState] = useState([...cartItem].fill(false));
  const [totalPrice, setTotalPrice] = useState(0);
  const history = useHistory();
  const handleCheck = (idItem) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === idItem ? !item : item
    );
    setCheckedState(updatedCheckedState);
    const total = updatedCheckedState.reduce((sum, currentState, index) => {
      if (currentState === true) {
        return sum + cartItem[index].products.Price * cartItem[index].quanlity;
      }
      return sum;
    }, 0);

    setTotalPrice(total);
  };
  const getData = useMemo(() => handleCheck(cartItem), [cartItem]);
  let newarray = [];
  const handleSubmitOrder = () => {
    [...checkedState]?.map((item, index) => {
      if (item === true) {
        newarray.push(cartItem[index]);
      }
      return newarray;
    });
    // history.push("/checkout");
  };
  handleSubmitOrder();
  const handleDeleteItem = (id) => {
    confirm({
      title: "Bạn có chắc chắn muốn xóa sản phẩm này",
      icon: <ExclamationCircleOutlined />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        deleteItemCart(id);
        message.success("Xóa sản phẩm thành công !");
        setCheckedState([...cartItem].fill(false));
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleIncrease = (id, quanlity) => {
    const increase = increaseQuanlity(id, quanlity);
    if (increase) {
      message.success("Tăng phẩm thành công !", 1);
    }
    return increase;
  };
  const handleDecrease = (id, quanlity) => {
    const increase = decreaseQuanlity(id, quanlity);
    if (increase) {
      message.success("Giảm sản phẩm thành công !", 1);
    }
    return increase;
  };
  const handleCheckProduct = () => {
    if (newarray.length === 0) {
      message.warning("Vui lòng chọn ít nhất 1 sản phẩm !", 2);
    } else {
      message.loading("Loading ...", 1);
      const local = {
        pathname: "/checkout",
        state: { newarray, totalPrice },
      };
      history.push(local);
    }
  };
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
                  {cartItem.map((item, index) => {
                    return (
                      <ListProductCart
                        key={item.id}
                        cartItem={item}
                        index={index}
                        formatPrice={formatPrice}
                        deleteItemCart={handleDeleteItem}
                        increaseQuanlity={handleIncrease}
                        decreaseQuanlity={handleDecrease}
                        checkedState={checkedState}
                        handleCheck={handleCheck}
                      />
                    );
                  })}
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
                <div>Tổng số tiền</div>
                <div className="total-price__product">
                  {formatPrice.format(totalPrice)}
                </div>
              </div>
              <button onClick={() => handleCheckProduct()}>Thanh Toán</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailCart;
