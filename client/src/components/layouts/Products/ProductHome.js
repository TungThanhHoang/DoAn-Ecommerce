import React, { useContext, useEffect } from "react";
import slug from "slug";
import CardProduct from "./CardProduct";
import ProductItem from "../NewProducts/ProductItem";
import { Row } from "antd";
import "./ProductHome.css";
import { ProductContext } from "../../../contexts/ProductContext";
import { LOCAL_TOKEN_USER } from "../../../contexts/constants";
function ProductHome() {
  const {
    productState: { products },
    type,
    loadProduct,
  } = useContext(ProductContext);
 const { formatPrice } = useContext(ProductContext)
  useEffect(() => {
    setTimeout(() => {
      const getToken = localStorage.getItem("ward");
      const tokenProduct = slug(getToken);
      loadProduct(tokenProduct);
    });
  }, []);
  return (
    <div className="main-product">
      <div className="card-new__title">Các loại sản phẩm</div>
      <Row className="box-product">
        {products?.map((item) => {
          return <CardProduct key={item.id} product={item} formatPrice={formatPrice}/>;
        })}
      </Row>
    </div>
  );
}

export default ProductHome;
