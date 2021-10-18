import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthContextProvider from "./contexts/AuthContext";
import ProductContextProvider from "./contexts/ProductContext";
import CartContextProvider from "./contexts/CartContext";
import CheckOutContextProvider from "./contexts/CheckOutContext";

ReactDOM.render(
  <AuthContextProvider>
    <ProductContextProvider>
      <CartContextProvider>
        <CheckOutContextProvider>
          {/* <React.StrictMode> */}
          <App />
          {/* </React.StrictMode> */}
        </CheckOutContextProvider>
      </CartContextProvider>
    </ProductContextProvider>
  </AuthContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
