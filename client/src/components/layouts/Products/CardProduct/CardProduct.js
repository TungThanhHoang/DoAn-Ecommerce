import React, {useContext} from "react";
import { Col } from "antd";
import { ShoppingCart, MapPin } from "react-feather";
import { apiUrl } from "../../../../contexts/constants";
import { ProductContext } from "../../../../contexts/ProductContext";
function CardProduct({
  product: {
    id,
    title,
    Price,
    slug,
    size,
    picture: {
      0: { url },
    },
  },
}) {
  const { formatPrice, addProduct } = useContext(ProductContext);

  return (
    <Col xs={12} sm={6} xl={4} lg={5} className="card-product">
      <div className="card-product__wrap ">
        <img src={`${apiUrl}${url}`} alt="" className="bg-img" />
        <div className="padding-content">
          <div className="title-product">{title}</div>
          <div className="ward-product">
            <MapPin size={12} /> <span>hải châu</span>
          </div>
          <div className="quality-product">
            <div className="price-product">{formatPrice.format(Price)}</div>
            <div className="size-product"> {size}</div>
          </div>
          <button className="" onClick={(e) => addProduct(id)}>
            <span>Thêm vào giỏ</span>
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </Col>
  );
}

export default CardProduct;
