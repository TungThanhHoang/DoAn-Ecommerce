import { Alert } from "antd";
import axios from "axios";
import { notification } from "antd";
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
  const [isloading, setIsLoading] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [newProduct, setNewProducts] = useState([]);
  const [productState, dispatch] = useReducer(ProductReducer, {
    isLoading: true,
    products: [],
    newProducts: [],
  });
  const getToken = localStorage.getItem(LOCAL_TOKEN_USER);

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
  const handleNotify = () => {
    notification["success"]({
      duration: 2,
      message: "Thành Công",
      description: "Đã thêm sản phẩm vào giỏ hàng !",
    });
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

  const addProductToCart = async (productId) => {
    const item = cartItem.find((idItem) => idItem.products.id === productId);
    try {
      setIsLoading(true);
      if (item) {
        const response = await axios.put(`${apiUrl}/items/${item.id}`, {
          quanlity: parseInt(item.quanlity) + 1,
        });
        if (response.data) {
          setIsLoading(false);
          handleNotify();
          loadItemCart();
          console.log(response.data);
        }
      } else {
        const response = await axios.post(`${apiUrl}/items`, {
          products: productId,
          quanlity: 1,
        });
        if (response.data) {
          setIsLoading(false);

          handleNotify();
          loadItemCart();
          console.log(response.data);
        }
      }
    } catch (error) {
      console.log(error.data);
    }
  };

  const increaseQuanlity = async (itemId, quanlity) => {
    try {
      if (quanlity < 10) {
        console.log("test", cartItem);
        setIsLoading(true);
        await axios
          .put(`${apiUrl}/items/${itemId}`, {
            quanlity: parseInt(quanlity) + 1,
          })
          .then((res) => {
            if (res.data) {
              setIsLoading(false);
              loadItemCart();
              console.log("Tăng sản phẩm", cartItem.quanlity);
            }
          });
      } else {
        alert("Đã đạt tối đa số lượng!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const decreaseQuanlity = async (itemId, quanlity) => {
    try {
      if (quanlity > 1) {
        console.log("test", cartItem);
        await axios
          .put(`${apiUrl}/items/${itemId}`, {
            quanlity: parseInt(quanlity) - 1,
          })
          .then((res) => {
            if (res.data) {
              loadItemCart();
              console.log("Tăng sản phẩm", cartItem.quanlity);
            }
          });
      } else {
        alert("Đã đạt tối thiểu số lượng!");
      }
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
    loadItemCart();
  }, []);

  const dataContext = {
    productState,
    formatPrice,
    cartItem,
    newProduct,
    isloading,
    addProductToCart,
    setCartItem,
    deleteItemCart,
    increaseQuanlity,
    decreaseQuanlity,
  };

  return (
    <ProductContext.Provider value={dataContext}>
      {children}
    </ProductContext.Provider>
  );
};
export default ProductContextProvider;
