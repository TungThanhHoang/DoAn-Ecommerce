import { LOCAL_TOKEN_NEW_PRODUCTS } from "../contexts/constants";
import {
  ADD_TO_CART,
  LOAD_ITEMS_CART,
  LOAD_NEW_PRODUCTS,
  LOAD_PRODUCTS,
} from "./Type";

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        isLoading: false,
      };
    case LOAD_ITEMS_CART:
      return {
        ...state,
        cartItem: action.items,
        isLoading: false,
      };
    case LOAD_NEW_PRODUCTS:
      return {
        ...state,
        newProducts: action.products.slice(0, 8),
        isLoading: false,
      };
    // case ADD_TO_CART:
    //   const updateCart = [...payload.products];
    //   const updateCartIndex = updateCart.findIndex(
    //     (item) => item.id === payload.productId
    //   );
    //   if (updateCartIndex < 1) {
    //     updateCart.push({ ...payload.products, quanlity: 1 });
    //   } else {
    //     const updateItem = {
    //       ...updateCart[updateCartIndex],
    //     };
    //     updateItem.quanlity++;
    //     updateCart[updateCartIndex] = updateItem;
    //   }

    default:
      return state;
  }
};
