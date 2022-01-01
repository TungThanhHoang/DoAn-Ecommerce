import "./Navbar.css";
import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { ShoppingCartOutlined, MenuOutlined } from "@ant-design/icons";
import {
  LogOut,
  Search,
  User,
  MapPin,
  Home,
  X,
  Lock,
  Layout,
  ShoppingCart
} from "react-feather";
import { Badge, Dropdown, Menu } from "antd";
import CartItem from "../CartItem";
import { AuthContext } from "../../../contexts/AuthContext";
import { ProductContext } from "../../../contexts/ProductContext";
import { CartContext } from "../../../contexts/CartContext";
import { LOCAL_TOKEN_NAV } from "../../../contexts/constants";

export default function Navbar() {
  const history = useHistory();
  const {
    authState: {
      user: { firstname, ward, district },
    },
    logoutUser,
  } = useContext(AuthContext);
  const { cartItem, deleteItemCart, loadItemCart } = useContext(CartContext);
  const { formatPrice } = useContext(ProductContext);
  const [SearchState, setSearchState] = useState(false);
  const [MenuState, setMenuState] = useState(false);
  const [NavAccount, setNavAccount] = useState(false);

  // localStorage.setItem(LOCAL_TOKEN_NAV, JSON.stringify(NavAccount));

  // const getStateNav = localStorage.getItem(
  //   LOCAL_TOKEN_NAV,
  //   JSON.parse(NavAccount)
  // );

  useEffect(() => {
    loadItemCart();
  }, []);

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };
  const handleNavigationAccount = () => {
    setNavAccount(!NavAccount);
    const local = {
      pathname: "/user/info",
    };
    history.push(local);
  };

  const handleNavigationHome = () => {
    setNavAccount(!NavAccount);
    // localStorage.setItem(LOCAL_TOKEN_NAV, JSON.stringify(NavAccount));
    const local = {
      pathname: "/",
    };
    history.push(local);
  };
  let renderCartItems = (
    <div className="cart">
      <h4 className="title">Sản phẩm vừa thêm</h4>
      <div className="padding-1">
        {cartItem.length ? (
          cartItem?.slice(0, 3).map((item) => {
            return (
              <CartItem
                itemcart={item}
                key={item.id}
                formatPrice={formatPrice}
                deleteItemCart={deleteItemCart}
              />
            );
          })
        ) : (
          <div className="cart-empty">
            <img alt="" src="../../../empty-cart.png" />
            <span>Giỏ hàng trống</span>
          </div>
        )}
      </div>
      {cartItem.length ? (
        <div className="cart-item__hidden">Tổng {cartItem.length} Sản phẩm</div>
      ) : (
        ""
      )}
      <Link to="/cart" className="cart-view">
        Xem Giỏ Hàng
      </Link>
    </div>
  );
  let menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <Link to="/user/info">Thông tin cá nhân</Link>
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>
          <button className="btn-logout" onClick={() => handleLogout()}>
            <LogOut size={20} className="icon-logout" /> Thoát
          </button>
        </span>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <nav>
        <div className="container">
          <div className="navbar">
            <div onClick={() => setMenuState(!MenuState)} className="icon-menu">
              <MenuOutlined
                style={{ color: "var(--color-footer)", fontSize: "20px" }}
              />
            </div>
            <div className="logo-brand">
              <Link to="/">
                <img src="../../../logo.png" alt="" />
              </Link>
            </div>
            <div className="location">
              <MapPin style={{ color: "orange" }} size={18} />
              <div className="ward-location">
                {ward}, {district}
              </div>
            </div>
            <div className="navbar-search">
              <input
                type="text"
                placeholder="Tìm kiếm"
                className="field-input"
              />
              <span className="btn-search">
                <Search size={24} className="nav-search-icon" />
              </span>
            </div>
            <div className="navbar-user">
              <div className="nav-name__user">Xin chào, {firstname}</div>
              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <div>
                  <div className="nav-background__user">
                    <User className="nav-icon__user" />
                  </div>
                  <div></div>
                </div>
              </Dropdown>
            </div>
            <div className="navbar-cart">
              <Dropdown overlay={renderCartItems} placement="bottomRight" arrow>
                <Badge count={cartItem?.length}>
                  <ShoppingCartOutlined className="navbar-icon-cart" />
                </Badge>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>

      {MenuState ? (
        <div className="menubar">
          <div className="menubar-top">
            <div className="logo-brand">
              <Link to="/">
                <img src="../../../logoEcommerce.png" alt="" />
              </Link>
            </div>
            <div onClick={() => setMenuState(!MenuState)}>
              <X size={30} style={{ color: "var(--color-gray)" }} />
            </div>
          </div>
          <div className="location-user">
            <div className="title-location">
              <MapPin
                style={{ color: "orange ", marginRight: "10px" }}
                size={18}
              />
              <div style={{ fontWeight: "500", fontSize: "15px" }}>
                Địa điểm
              </div>
            </div>
            <div className="ward-location">
              <div>
                {ward}, {district}, TP Đà Nẵng
              </div>
            </div>
          </div>
          <div className="name-user">
            <div>Xin chào</div>
            <div style={{ fontWeight: "500" }}>, Hoàng Mai</div>
          </div>
          <button>
            <LogOut style={{ margin: "0 1rem" }} />
            <div className="title-exit">Thoát</div>
          </button>
        </div>
      ) : (
        ""
      )}
      {/* Navigation Menu bottom */}

      {SearchState ? (
        <div className="navbar-search__mobile">
          <div className="navbar-search">
            <input type="text" placeholder="Tìm kiếm" className="field-input" />
            <span className="btn-search">
              <Search size={24} className="nav-search-icon" />
            </span>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* Menu bottom home */}

      {/* menu bottom account */}
      {NavAccount ? (
        <div className="navbar-mobile navbar-mobile__account">
          <div onClick={() => handleNavigationHome()} className="navbar-item">
            <Home size={20} className="color-menu" />
            <div className="color-menu">Home</div>
          </div>
          <Link to="/user/info" className="navbar-item">
            <User size={20} className="color-menu" />
            <div className="color-menu">Tài khoản</div>
          </Link>
          <Link to="/user/bill" className="navbar-item">
            <Layout size={20} className="color-menu" />
            <div className="color-menu">Đơn hàng</div>
          </Link>
          <Link to="/user/change-password" className="navbar-item">
            <Lock size={20} className="color-menu" />
            <div className="color-menu">Mật khẩu</div>
          </Link>
        </div>
      ) : (
        <div className="navbar-mobile">
          <Link to="/" className="navbar-item">
            <Home size={20} className="color-menu" />
            <div className="color-menu">Home</div>
          </Link>
          <div
            className="navbar-item"
            onClick={() => setSearchState(!SearchState)}
          >
            <Search size={20} className="color-menu" />{" "}
            <div className="color-menu">Tìm kiếm</div>
          </div>
          <Link to="/cart" className="navbar-item">
            <ShoppingCart size={20} className="color-menu" />
            <div className="color-menu">Giỏ hàng</div>
          </Link>
          <div
            onClick={() => handleNavigationAccount()}
            className="navbar-item"
          >
            <User size={20} className="color-menu" />
            <div className="color-menu">Tài khoản</div>
          </div>
        </div>
      )}
    </>
  );
}
