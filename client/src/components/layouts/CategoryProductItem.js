import React, { useContext } from "react";
import { Col, message } from "antd";
import { ShoppingCart, MapPin } from "react-feather";
import { CartContext } from "../../contexts/CartContext";
import { ProductContext } from "../../contexts/ProductContext";
import { apiUrl } from "../../contexts/constants";
function CategoryProductItem({
  product: {
    id,
    title,
    Price,
    size,
    picture: {
      0: { url },
    },
    wards,
  },
}) {
  const newWard = [];
  const getWard = localStorage.getItem("ward");
  wards.map((item) => {
    if (item.name === getWard) newWard.push(item.name);
    return newWard;
  });

  const { formatPrice } = useContext(ProductContext);
  const { addProductToCart } = useContext(CartContext);

  const handleAddProduct = (productId) => {
    const addCart = addProductToCart(productId);
    if (addCart) {
      message.success("Thêm sản phẩm thành công", 1);
    }
    return addCart;
  };
  return (
    <Col xs={12} sm={8} xl={8} lg={8} className="card-product">
      <div className="card-product__wrap ">
        <img src={`${apiUrl}${url}`} alt="" className="bg-img" />
        <div className="padding-content">
          <div className="title-product">{title}</div>
          <div className="ward-product">
            <MapPin size={12} /> <span>{newWard}</span>
          </div>
          <div className="quality-product">
            <div className="price-product">{formatPrice.format(Price)}</div>
            <div className="size-product"> {size}</div>
          </div>
          <button className="" onClick={(e) => handleAddProduct(id)}>
            <span>Thêm vào giỏ</span>
            <ShoppingCart size={18} style={{ marginLeft:'8px'}} />
          </button>
        </div>
      </div>
    </Col>
  );
}

export default CategoryProductItem;
