import React, { useContext, useState, useEffect, useMemo } from "react";
import "./DetailCart.css";
import { Link, useHistory } from "react-router-dom";
import { Row, Col, Spin } from "antd";
import ListProductCart from "./ListProductCart";
import { ProductContext } from "../../../contexts/ProductContext";
import { CartContext } from "../../../contexts/CartContext";
import { Filter } from "react-feather";
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
  let newarray = []
  const handleSubmitOrder = () => {
    [...checkedState]?.map((item, index) => {
      if (item === true) {
        newarray.push(cartItem[index])
      }
      return newarray;
    });
    // history.push("/checkout");
  };
 handleSubmitOrder()
  const handleDeleteItem = (id) => {
    deleteItemCart(id);
    setCheckedState([...cartItem].fill(false));
  };
  const handleCheckProduct = () =>{
     if(newarray.length === 0 ){
       alert("Vui lòng chọn ít nhất 1 sản phẩm !")
     } else{
       const local = {
         pathname:"/checkout",
         state:{ newarray , totalPrice }
       }
       history.push(local)
     }
  }
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
                    cartItem.map((item, index) => {
                      return (
                        <ListProductCart
                          key={item.id}
                          cartItem={item}
                          index={index}
                          formatPrice={formatPrice}
                          deleteItemCart={handleDeleteItem}
                          increaseQuanlity={increaseQuanlity}
                          decreaseQuanlity={decreaseQuanlity}
                          checkedState={checkedState}
                          handleCheck={handleCheck}
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
                <div>Tổng số tiền</div>
                <div className="total-price__product">
                  {formatPrice.format(totalPrice)}
                </div>
              </div>
              <button onClick={()=> handleCheckProduct()}>
                Thanh Toán
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DetailCart;
