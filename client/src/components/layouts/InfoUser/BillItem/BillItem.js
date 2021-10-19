import React from "react";
import CartItem from "./CartItem";

export default function BillItem({
  bill: { id, price, createdAt, status, cart , id_code },
  formatPrice,
}) {
  const date = new Date(createdAt);
  const dateOrder = date.toLocaleString("en-Us");
  return (
    <div className="bill-item">
     <div className="state-bill">
     <div className="code-bill">#{id_code}</div>
      <div className="state-delivery">
        {status === "confirmed"
          ? "Đã xác nhận"
          : status === "unconfirmed"
          ? "Chưa xác nhận"
          : status === "deliveried"
          ? "Đã giao hàng"
          : status === "delivery"
          ? "Đang giao hàng"
          : "Đã hủy"}
      </div>
     </div>

      {cart.map((item) => (
        <CartItem formatPrice={formatPrice} key={item.id} cart={item} />
      ))}
      <div className="bill-price">
        <div className="date-order">Đã đặt hàng vào lúc: {dateOrder}</div>
        <div className="total-price">
          Tổng số tiền: <span>{formatPrice.format(price)}</span>
        </div>
      </div>
    </div>
  );
}
