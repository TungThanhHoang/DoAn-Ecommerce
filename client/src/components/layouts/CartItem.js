import React from "react";
function CartItem({
  itemcart: {
    id:itemId,
    products: {
      title,
      Price,
      picture: {
        0: { url },
      },
    },
  },
  formatPrice,
  handleCheck
}) {
  return (
    <>
      <div className="cart-item">
        <img
          src={`http://localhost:1337` + url}
          alt=""
          style={{ width: "40px", height: "40px" }}
        />
        <div className="cart-title">{title}</div>
        <div className="cart-price">{formatPrice.format(Price)}</div>
      </div>
      {/* <button onClick={ (e) => deleteItemCart(itemId)}> Delete </button> */}
    </>
  );
}

export default CartItem;
