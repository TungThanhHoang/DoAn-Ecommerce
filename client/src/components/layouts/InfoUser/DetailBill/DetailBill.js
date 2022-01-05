import React, { useContext, useEffect } from "react";
import "./DetailBill.css";
import { Row, Col } from "antd";
import { useParams, useLocation } from "react-router-dom";
import { CheckOutContext } from "../../../../contexts/CheckOutContext";
import { ProductContext } from "../../../../contexts/ProductContext";
import { apiUrl } from "../../../../contexts/constants";
import LoadingPage from "../../LoadingPage";
function DetailBill() {
  const { loadItemBill, billItem, isLoadingBill } = useContext(CheckOutContext);
  const { formatPrice } = useContext(ProductContext);
  const { id } = useParams();

  useEffect(() => {
    loadItemBill(id);
  }, []);
  console.log(billItem);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const dateOrder = date.toLocaleString("en-Us");
    return dateOrder;
  };

  const ProductItem = ({
    item: {
      quanlity,
      products: {
        Price,
        size,
        title,
        picture: {
          0: { url },
        },
      },
    },
  }) => (
    <div>
      <Row className="row-product">
        <Col xs={14} sm={8} md={8} lg={8} xl={8}>
          <div className="card-product">
            <img src={`${apiUrl}${url}`} alt="" width={70} height={70} />
            <div>
              <span>{title}</span>
            </div>
          </div>
        </Col>
        <Col xs={10} sm={16} md={16} lg={16} xl={16}>
          <Row>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <div className="title-wrap ">{formatPrice.format(Price)}</div>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <div className="title-wrap ">x{quanlity}</div>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <div className="title-wrap ">{size}</div>
            </Col>
            <Col xs={24} sm={6} md={6} lg={6} xl={6}>
              <div className="title-wrap ">{formatPrice.format(Price)}</div>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
  return (
    <div className="detail-bill">
      <h2>Chi tiết đơn hàng</h2>
      {isLoadingBill ? (
        <LoadingPage />
      ) : (
        <div>
          <div className="info-order">
            <div>
              <span>Mã đơn:</span>
              <span className="code-order">#{billItem.id_code}</span>
            </div>
            <div className="status-order">
              <div className="date-order">{formatDate(billItem.createdAt)}</div>
              <div className="title-status">
                {billItem.status === "confirmed"
                  ? "Đã xác nhận"
                  : billItem.status === "unconfirmed"
                  ? "Chưa xác nhận"
                  : billItem.status === "deliveried"
                  ? "Đã giao hàng"
                  : billItem.status === "delivery"
                  ? "Đang giao hàng"
                  : "Đã hủy"}
              </div>
            </div>
          </div>
          <Row className="card-wrap">
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div>
                <h4>Địa chỉ người nhận</h4>
                <div className="card-order__info">
                  <h4>{billItem.name}</h4>
                  <div>
                    <span>Điện thoại:</span>
                    <span className="phone-user">{billItem.phone}</span>
                  </div>
                  <div>
                    <span>Địa chỉ:</span>
                    <span className="address-delivery">{billItem.address}</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div>
                <h4>Hình thức giao hàng</h4>
                <div className="card-order__info">
                  <h4>Nguyễn Văn A</h4>
                  <div>
                    <span style={{ marginRight: "5px" }}>Giao hàng:</span>
                    <span className="date-delivery">
                      {formatDate(billItem.updatedAt)}
                    </span>
                  </div>
                  <div>
                    <span>Phí vận chuyển:</span>
                    <span className="address-delivery">15.000đ</span>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <div>
                <h4>Hình thức thanh toán</h4>
                <div className="card-order__info">
                  <div className="payments">
                    <img
                      src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/checkout/icon-payment-method-cod.svg"
                      alt=""
                      width={28}
                      height={28}
                    />
                    <h4>{billItem.payment}</h4>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="card-thank">
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              <span>Cảm ơn bạn đã mua sắm !</span>
            </Col>
            <Col xs={12} sm={12} md={12} lg={12} xl={12}>
              {billItem.status === "unconfirmed" ? (
                <button>Hủy đơn hàng</button>
              ) : billItem.status === "deliveried" ? (
                <button>Mua lại</button>
              ) : ""}
            </Col>
          </Row>
          <Row className="card-title__wrap">
            <Col span={8}>
              <div className="title-column">Sản phẩm</div>
            </Col>
            <Col span={4}>
              <div className="title-column">Giá</div>
            </Col>
            <Col span={4}>
              <div className="title-column">Số lượng</div>
            </Col>
            <Col span={4}>
              <div className="title-column">Trọng lượng</div>
            </Col>
            <Col span={4}>
              <div className="title-column">Tạm tính</div>
            </Col>
          </Row>
          <div className="product-order">
            {billItem.cart?.map((item) => (
              <ProductItem item={item} />
            ))}
          </div>
          <div className="detail-price">
            <Row justify="end">
              <Col xs={24} sm={10} md={9} lg={9} xl={8}>
                <Row>
                  <Col span={12}>
                    <div className="column-title">Tạm tính</div>
                  </Col>
                  <Col span={12}>
                    <div className="number-column">
                      {formatPrice.format(billItem.price - 15000)}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div className="column-title">Phí vận chuyển</div>
                  </Col>
                  <Col span={12}>
                    <div className="number-column">
                      {formatPrice.format(15000)}
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <div className="column-title total-price">Tổng tiền</div>
                  </Col>
                  <Col span={12}>
                    <div className="number-column price-order">
                      {formatPrice.format(billItem.price)}
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailBill;
