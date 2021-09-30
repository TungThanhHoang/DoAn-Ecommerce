import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import Navbar from "../layouts/Navbar";
import { AuthContext } from "../../contexts/AuthContext";
import Header from "../layouts/Header";
function ProtectRouter({ component: Component, ...rest }) {
  const {
    authState: { isLoading, isAuth },
  } = useContext(AuthContext);
  if (isLoading) {
    return (
      <div className="spin-load">
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuth ? (
          <>
            <Header />
            <Navbar />
            <Component {...rest} {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
export default ProtectRouter;
