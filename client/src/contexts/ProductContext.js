import { Alert } from "antd";
import axios from "axios";
import React, { createContext, useEffect, useState, useReducer } from "react";
import slug from "slug";
import { ProductReducer } from "../reducers/ProductReducer";
import { LOAD_NEW_PRODUCTS, LOAD_PRODUCTS } from "../reducers/Type";
import { apiUrl, LOCAL_TOKEN_USER } from "./constants";
export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [productState, dispatch] = useReducer(ProductReducer, {
    isLoading: true,
    products: [],
    newProducts: [],
  });
  // const getWard = localStorage.getItem("ward") ;
  // const slugWard = slug(getWard) ;
  // const getWard = localStorage.getItem("ward");
  // const slugWard = slug(getWard);
  const loadProduct = async (type) => {
    try {
      const response = await axios.get(
        `${apiUrl}/products?wards.slug=${type}&_start=8&_sort=createdAt:DESC`
      );
      if (response.data) {
        dispatch({ type: LOAD_PRODUCTS, payload: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const loadNewProduct = async (type) => {
    try {
      await axios
        .get(
          `${apiUrl}/products?wards.slug=${type}&_limit=8&_sort=createdAt:DESC`
        )
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

  const dataContext = {
    productState,
    formatPrice,
    loadProduct,
    loadNewProduct,
  };

  return (
    <ProductContext.Provider value={dataContext}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
