import { Alert } from "antd";
import axios from "axios";
import React, { createContext, useEffect, useState, useReducer } from "react";
import { ProductReducer } from "../reducers/ProductReducer";
import { LOAD_NEW_PRODUCTS, LOAD_PRODUCTS } from "../reducers/Type";
import { apiUrl } from "./constants";
export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(ProductReducer, {
    isLoading: true,
    products: [],
    newProducts: [],
  });

  const loadProduct = async () => {
    try {
      await axios
        .get(`${apiUrl}/products?_start=8`)
        .then((res) => {
          dispatch({ type: LOAD_PRODUCTS, payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const loadNewProduct = async () => {
    try {
      await axios
        .get(`${apiUrl}/products?_limit=8`)
        .then((res) => {
          dispatch({ type: LOAD_NEW_PRODUCTS, payload: res.data });
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const formatPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    loadProduct();
    loadNewProduct();
  }, []);

  const dataContext = {
    productState,
    formatPrice,
  };

  return (
    <ProductContext.Provider value={dataContext}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
