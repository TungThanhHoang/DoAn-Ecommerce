import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import Navbar from "../layouts/Navbar";
import { AuthContext } from "../../contexts/AuthContext";
import Notice from "../layouts/Notice";
import Header from "../layouts/Header";
import BreadCrumbEcommerce from "../layouts/BreadcrumbEcommerce";
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
            <Notice />
            <Header/>
            <Navbar />
            <BreadCrumbEcommerce/>
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
