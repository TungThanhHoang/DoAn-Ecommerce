import react, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiUrl, LOCAL_TOKEN_USER } from "./constants";
export const CheckOutContext = createContext();
const CheckOutContextProvider = ({ children }) => {
  const [payment, setPayment] = useState([]);
  const [bill, setBill] = useState([]);
  const [stateBill, setStateBill] = useState("");
  const [summaryBill, setSummaryBill] = useState([]);
  const getToken = localStorage.getItem(LOCAL_TOKEN_USER);

  const orderProducts = async (formProduct) => {
    try {
      const response = await axios.post(`${apiUrl}/bills`, formProduct, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
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
        .get(`${apiUrl}/bills?_sort=createdAt:DESC`, {
          headers: {
            Authorization: `Bearer ${getToken}`,
          },
        })
        .then((res) => setBill(res.data));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const handleLoadBillDeivery = async () => {
      try {
        await axios
          .get(`${apiUrl}/bills?status=${stateBill}&_sort=createdAt:DESC`, {
            headers: {
              Authorization: `Bearer ${getToken}`,
            },
          })
          .then((res) => setSummaryBill(res.data));
      } catch (error) {
        console.log(error);
      }
    };
    handleLoadBillDeivery();
  }, [stateBill]);

  const contextData = {
    bill,
    payment,
    summaryBill,
    loadBill,
    setStateBill,
    orderProducts,
  };
  return (
    <CheckOutContext.Provider value={contextData}>
      {children}
    </CheckOutContext.Provider>
  );
};

export default CheckOutContextProvider;
