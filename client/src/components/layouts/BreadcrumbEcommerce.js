import React from "react";
import { Breadcrumb } from "antd";
import { HomeOutlined } from "@ant-design/icons";
function BreadCrumbEcommerce() {
  return (
    <div className="container">
      <div style={{margin:'1rem 0'}}>
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined style={{ fontSize: "18px" }} />
            <span>Trang Chủ</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    </div>
  );
}

export default BreadCrumbEcommerce;
