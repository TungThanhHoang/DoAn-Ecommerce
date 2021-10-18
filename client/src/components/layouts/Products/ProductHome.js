import React, { useContext } from "react";
import CardProduct from "./CardProduct";
import { Row} from 'antd'
import "./ProductHome.css";
import { ProductContext } from "../../../contexts/ProductContext";
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
