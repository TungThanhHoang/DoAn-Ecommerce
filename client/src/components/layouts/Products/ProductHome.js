import React, { useContext } from "react";
import { ProductContext } from "../../../contexts/ProductContext";
import ProductItem from "../ProductItem";
import CardProduct from "./CardProduct/CardProduct";
import { Row} from 'antd'
import "./ProductHome.css";
function ProductHome() {
  const {
    productState: { products },
  } = useContext(ProductContext);
  return (
    <div className="main-product">
      <div className="card-new__title">Các loại sản phẩm</div>
      <Row className="box-product">
      {products?.map((item) => {
        return <CardProduct key={item.id} product={item} />;
      })}
    </Row>
</div>
  );
}

export default ProductHome;
