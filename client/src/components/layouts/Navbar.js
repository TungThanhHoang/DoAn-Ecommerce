import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { LogOut, Search, User } from "react-feather";
import { Badge, Dropdown, Menu } from "antd";
import "./Navbar.css";
import { AuthContext } from "../../contexts/AuthContext";
export default function Navbar() {
  const {
    authState: {
      user: { firstname },
    },
    logoutUser,
  } = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser();
    window.location.reload();
  };
  const cartItem = (
    <div className="cart">
      <h4 className="title">Sản phẩm vừa thêm</h4>
      <div className="padding-1">
        <div className="cart-item">
          <img
            src="../../../nho.jpg"
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
          <div className="cart-title">The Ordinary B5</div>
          <div className="cart-price">200.000đ</div>
        </div>
        <div className="cart-item">
          <img
            src="../../../nho.jpg"
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
          <div className="cart-title">The Ordinary B5</div>
          <div className="cart-price">200.000đ</div>
        </div>
        <div className="cart-item">
          <img
            src="../../../nho.jpg"
            alt=""
            style={{ width: "50px", height: "50px" }}
          />
          <div className="cart-title">
            The Ordinary B5 sdhjshdsjdhsjdhdjahdsdsdfdfdfdfdsfsdfsdasd
          </div>
          <div className="cart-price">200.000đ</div>
        </div>
      </div>
      <div className="cart-item__hidden">+ 3 Sản phẩm</div>
      <Link to="" className="cart-view">
        Xem Giỏ Hàng
      </Link>
    </div>
  );
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <Link to="">Thông tin cá nhân</Link>
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>
          <button className="btn-logout" onClick={handleLogout}>
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
            <div className="logo-brand">
              <img src="../../../logoEcommerce.png" alt="" />
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
              <Dropdown overlay={cartItem} placement="bottomRight" arrow>
                <Badge count={4}>
                  <ShoppingCartOutlined className="navbar-icon-cart" />
                </Badge>
              </Dropdown>
            </div>
          </div>
        </div>
      </nav>
      <div className="navbar-search__mobile">
        <div className="navbar-search">
          <input type="text" placeholder="Tìm kiếm" className="field-input" />
          <span className="btn-search">
            <Search size={24} className="nav-search-icon" />
          </span>
        </div>
      </div>
    </>
  );
}
