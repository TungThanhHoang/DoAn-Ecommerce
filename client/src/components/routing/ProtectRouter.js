import React, { useContext, useEffect, useState, useMemo } from "react";
import { Route, Redirect } from "react-router-dom";
import { Spin } from "antd";
import Navbar from "../layouts/Navbar/Navbar";
import { AuthContext } from "../../contexts/AuthContext";
import Notice from "../layouts/Notice";
import Header from "../layouts/Header/Header";
import BreadCrumbEcommerce from "../layouts/BreadcrumbEcommerce";
import Footer from "../../pages/Footer";
function ProtectRouter({ component: Component, ...rest }) {
  // const location = useLocation();
  const [navbar, setNavbar] = useState(false);
  const {
    authState: { isLoading, isAuth },
  } = useContext(AuthContext);

  // const changeNav = () =>{
  //   if (window.location.pathname === "/order-success") {
  //     setNavbar(true);
  //   }
  // }
  // useMemo(() => changeNav(navbar), [navbar])

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
            <Header />
            {!navbar ? <Navbar /> : null}
            {/* {!navbar ? <BreadCrumbEcommerce /> : null} */}

            <Component {...rest} {...props} />
            <Footer />
          </>
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
export default ProtectRouter;
