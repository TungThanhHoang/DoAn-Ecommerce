import React from "react";
import { Row, Col, Button, Image, Rate } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { apiUrl } from "../../../contexts/constants";
import { MapPin } from "react-feather";
function CardProduct({
  item: {
    title,
    size,
    Price,
    picture: {
      0: { url },
    },
  },
  formatPrice,
}) {
  return (
    <div style={{ backgroundColor: "#fff", borderRadius: ".4rem" }}>
      <Row>
        <Col span={12}>
          <div className="detail-product__left">
            <Image width={500} src={`${apiUrl}${url}`} />
          </div>
        </Col>
        <Col span={12}>
          <div className="detail-product__right">
            <div className="title-product">{title}</div>
            <div>
              <Rate defaultValue="4" />
            </div>
            <div className="address-product">
              <MapPin size={18} /> <span>Phường Khuê Trung</span>
            </div>
            <div className="price-product">{formatPrice.format(Price)}</div>
            <div className="weight-product">
              <div>Trọng lượng</div>{" "}
              <div className="size-product">
                {" "}
                {size === "onebox"
                  ? "Hộp"
                  : size === "onebotlle"
                  ? "Chai"
                  : size === "fivegram"
                  ? "500g"
                  : ""}
              </div>
            </div>
            <div>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
              vero temporibus a ducimus animi perspiciatis est maiores facilis
              voluptatum atque vel cupiditate ratione non corrupti, aspernatur
              optio fugit, quaerat aperiam.
            </div>
            <div className="quanlity-product">
              <Button >
                <MinusOutlined />
              </Button>
              <Button >
                <PlusOutlined />
              </Button>
            </div>
            <div className="detail-product__button">
              <button>Mua Ngay</button>
              <button>Thêm Vào Giỏ Hàng</button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CardProduct;
