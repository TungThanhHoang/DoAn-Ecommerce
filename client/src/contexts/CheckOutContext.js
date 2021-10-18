import react, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiUrl, LOCAL_TOKEN_USER } from "./constants";
export const CheckOutContext = createContext();
const CheckOutContextProvider = ({ children }) => {
  const [payment, setPayment] = useState([]);
  const [bill, setBill] = useState([]);
  const getToken = localStorage.getItem(LOCAL_TOKEN_USER);

  const orderProducts = async (formProduct) => {
    try {
      const response = await axios.post(`${apiUrl}/bills`, formProduct);
      if (response.data) {
        setPayment(response.data);
      }
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };
  const loadBill = async () => {
    try {
      await axios
        .get(`${apiUrl}/bills`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => console.log(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    loadBill();
  }, []);
  const contextData = {
    payment,
    orderProducts,
  };
  return (
    <CheckOutContext.Provider value={contextData}>
      {children}
    </CheckOutContext.Provider>
  );
};

export default CheckOutContextProvider;
