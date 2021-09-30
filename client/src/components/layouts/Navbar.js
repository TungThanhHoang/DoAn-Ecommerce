import React, { useContext } from "react";
import { Link } from "react-router-dom";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DownOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {LogOut} from 'react-feather';
import { Badge, Dropdown, Menu } from "antd";
import "./Navbar.css";
import Header from "./Header";
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
    <div>
      <img src="../../../public/logo192.png" alt="" />
    </div>
  );
  const menu = (
    <Menu>
      <Menu.Item key="1">
        <span>
          <Link  to="">Thông tin cá nhân</Link>
        </span>
      </Menu.Item>
      <Menu.Item key="2">
        <span>
          <button className="btn-logout" onClick={handleLogout}>
            <LogOut size={20} className="icon-logout"/> Thoát
          </button>
        </span>
      </Menu.Item>
    </Menu>
  );
  return (
    <nav>
    <div className="container">
      <div className="navbar">
        <div className="logo-brand">
          <img src="../../../logoEcommerce.png" alt="" />
        </div>
        <div className="navbar-search">
          <input type="text" placeholder="Tìm kiếm" className="field-input" />
          <span className="btn-search">
            <SearchOutlined className="nav-search-icon" />
          </span>
        </div>
        <div className="navbar-user">
          <span className="nav-name__user">Xin chào,{firstname}</span>
          <Dropdown overlay={menu} placement="bottomRight" arrow>
            <span>
              <UserOutlined className="nav-icon__user" />
              <DownOutlined
                style={{ fontSize: "16px" }}
                className="nav-icon__down"
              />
            </span>
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
  );
}
