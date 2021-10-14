import React, { useContext } from "react";
import DetailCart from "../components/layouts/DetailCart/DetailCart";
import { ProductContext } from "../contexts/ProductContext";

export default function Cart() {
  
  return (
    <div className="container">
      <DetailCart />
    </div>
  );
}
