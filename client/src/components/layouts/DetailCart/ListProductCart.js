import React from "react";
import { apiUrl } from "../../../contexts/constants";
import { Trash2 } from "react-feather";
function ListProductCart({
  cartItem: {
    id,
    quanlity,
    products: {
      title,
      Price,
      picture: {
        0: { url },
      },
    },
  },
  formatPrice,
  deleteItemCart,
  increaseQuanlity,
  decreaseQuanlity
}) {
  const handleTotalPriceProduct = (quanlity , price) => {
    let total = (quanlity * price);
    return total;
  };
  
  return (
    <div className="product-cart__item">
      <div className="info-product">
        <input type="checkbox" />
        <img className="bg-img" src={`${apiUrl}` + url} alt="" />
        <div className="name-product">{title}</div>
      </div>
      <div className="total-product">
        <div className="price-product">{formatPrice.format(Price)}</div>
        <div className="quanlity-product">
          <button onClick={ (e) => decreaseQuanlity(id ,quanlity)} className="btn-increase">-</button>
          <input disabled type="text" value={quanlity} />
          <button onClick={ (e) => increaseQuanlity(id ,quanlity)} className="btn-decrease">+</button>
        </div>
        <div className="total-price">{formatPrice.format(handleTotalPriceProduct( quanlity, Price))}</div>
        <div className="btn-remove" onClick={(e) => deleteItemCart(id)}>
          <Trash2 size={16} color="orange" />
        </div>
      </div>
    </div>
  );
}

export default ListProductCart;
