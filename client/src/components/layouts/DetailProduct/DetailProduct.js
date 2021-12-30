import { Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { ProductContext } from "../../../contexts/ProductContext";
import CardProduct from "./CartProduct";
import "./DetailProduct.css";
function DetailProduct() {
  const { id } = useParams();
  const { pathname } = useParams();
  console.log(pathname);
  const {
    productState: { product },
    isloading,
    loadOneProduct,
    formatPrice,
  } = useContext(ProductContext);

  useEffect(() => {
    window.scrollTo(0, 0);
      loadOneProduct(id);
  }, [pathname]);

  console.log(product);

  return (
    <div>
      {isloading ? (
        <div className="spin-load">
          <Spin />
        </div>
      ) : (
        <div>
          {product?.map((item) => {
            return <CardProduct item={item} formatPrice={formatPrice} />;
          })}
        </div>
      )}
    </div>
  );
}

export default DetailProduct;
