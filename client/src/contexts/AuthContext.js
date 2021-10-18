import axios from "axios";
import React, {
  createContext,
  useEffect,
  useReducer,
  useState,
  useContext,
} from "react";
import { AuthReducer } from "../reducers/AuthReducer";
import { LOAD_ITEMS_CART } from "../reducers/Type";
import { apiUrl, LOCAL_TOKEN_USER } from "./constants";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [authState, dispatch] = useReducer(AuthReducer, {
    isLoading: true,
    isAuth: false,
    user: null,
  });

  const setToken = (token) => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = ` Bearer ${token} `;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  };
  const loadUser = async () => {
    if (localStorage[LOCAL_TOKEN_USER]) {
      setToken(localStorage[LOCAL_TOKEN_USER]);
    }
    try {
      await axios.get(`${apiUrl}/users/me`).then((res) =>
        dispatch({
          type: "SET_AUTH",
          payload: { isAuth: true, user: res.data },
        })
      );
    } catch (error) {
      localStorage.removeItem(LOCAL_TOKEN_USER);
      setToken(null);
      dispatch({ type: "SET_AUTH", payload: { isAuth: false, user: null } });
    }
  };
  const loginUser = async (formLogin) => {
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/auth/local`, formLogin);
      if (response.data.user) {
        setLoading(false);
        localStorage.setItem(LOCAL_TOKEN_USER, response.data.jwt);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  const registerUser = async (formRegister) => {
    try {
      const response = await axios.post(
        `${apiUrl}/auth/local/register`,
        formRegister
      );
      if (response.data.user) {
        localStorage.setItem(LOCAL_TOKEN_USER, response.data.jwt);
      }
      await loadUser();
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  };
  const logoutUser = () => {
    localStorage.clear();
    dispatch({ type: "SET_AUTH", payload: { isAuth: false, user: null } });
  };

  useEffect(() => {
    loadUser();
    return () => {
      loadUser();
    };
  }, []);

  const authData = {
    loading,
    loginUser,
    registerUser,
    logoutUser,
    authState,
  };
  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
