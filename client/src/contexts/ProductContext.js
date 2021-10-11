import axios from "axios";
import React, { createContext, useEffect, useState, useReducer } from "react";
import { ProductReducer } from "../reducers/ProductReducer";
import {
  LOAD_ITEMS_CART,
  LOAD_NEW_PRODUCTS,
  LOAD_PRODUCTS,
} from "../reducers/Type";
import { apiUrl, LOCAL_TOKEN_CART_ITEM, LOCAL_TOKEN_USER } from "./constants";
export const ProductContext = createContext();
const ProductContextProvider = ({ children }) => {
  // const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [productState, dispatch] = useReducer(ProductReducer, {
    isLoading: true,
    products: [],
  });
  const getToken = localStorage.getItem(LOCAL_TOKEN_USER);

  const loadProduct = async () => {
    try {
      await axios
        .get(`${apiUrl}/products`)
        .then((res) => {
          dispatch({ type: LOAD_PRODUCTS, payload: res.data });
          // setProducts(res.data);
          // const cutData = products.slice(0, 8);
          // setNewProducts(cutData);
          console.log("cut", newProducts);
          // localStorage.setItem(LOAD_NEW_PRODUCTS, JSON.stringify(cutData));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const loadItemCart = async () => {
    try {
      const response = await axios.get(`${apiUrl}/items`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      if (response.data) {
        localStorage.setItem(
          LOCAL_TOKEN_CART_ITEM,
          JSON.stringify(response.data)
        );
        const item = localStorage.getItem(LOCAL_TOKEN_CART_ITEM);
        if (item) {
          const StoreItem = JSON.parse(item);
          console.log("item", JSON.parse(item));
          setCartItem(StoreItem);
        }
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItemCart = async (itemId) => {
    try {
      await axios
        .delete(`${apiUrl}/items/${itemId}`)
        .then((res) => {
          if (res.data) {
            loadItemCart();
            console.log("Xoá Thành Công", res.data);
          }
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };
  // const addToCart = async (productId , quanlity) =>{
  //     const updateCart =  products.findIndex( item => item.id === productId)
  //       if(updateCart < 1){
  //         await axios.post(`${apiUrl}/items`, { productId , quanlity:quanlity+1} )
  //       }
  //       else{

  //       }
  // }

  const addProduct = async (productId) => {
    try {
      const addItem = productState.products?.findIndex(
        (item) => item.id === productId
      );
      const response = await axios.post(`${apiUrl}/items`, {
        products: productId,
        quanlity: 1,
      });
      if (response.data) {
        loadItemCart();
        console.log(response.data);
      }
      // if (addItem) {
      //   const response = await axios.put(`${apiUrl}/items/${productId}`, {
      //     quanlity: 1,
      //   });
      //   if (response.data) {
      //     console.log(response.data);
      //   }
      // } else {
      //   const response = await axios.post(`${apiUrl}/items`, {
      //     products: productId,
      //     quanlity: 1,
      //   });
      //   if (response.data) {
      //     console.log(response.data);
      //   }
      // }
    } catch (error) {
      console.log(error.data);
    }
  };

  const formatPrice = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    loadProduct();
    loadItemCart();
  }, []);

  const dataContext = {
    productState,
    formatPrice,
    cartItem,
    addProduct,
    setCartItem,
    deleteItemCart,
  };

  return (
    <ProductContext.Provider value={dataContext}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
