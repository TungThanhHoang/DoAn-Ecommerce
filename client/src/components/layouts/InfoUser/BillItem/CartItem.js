import React from "react";

function CartItem({ cart: { quanlity, products }, formatPrice }) {
  return (
    <div className="product-item">
      <img src="../../../nho.jpg" alt="" />
      <div className="info-product">
        <div className="title-product">Nho Khô</div>
        <div className="weight-product">
          Phân loại: <span>500G</span>
        </div>
        <div className="quanlity-product">SL: X{quanlity}</div>
      </div>
      <div className="price-product">{formatPrice.format(5000)}</div>
    </div>
  );
}

export default CartItem;
