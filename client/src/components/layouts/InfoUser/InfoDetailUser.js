import React from "react";
import "./InfoUser.css";
import { Edit3, User, Clipboard, Bell, DollarSign } from "react-feather";
import { Row, Col, Tabs } from "antd";
const { TabPane } = Tabs;
function InfoUser() {
  return (
    <Row>
      <Col span={6}>
        <div className="user-info__left">
          <div className="info-detail">
            <img src="../../../../nho.jpg" alt="" />
            <div className="info-user">
              <div>thanhtung176</div>
              <div>
                <Edit3 size={18} />
                Sửa Hồ Sơ
              </div>
            </div>
          </div>
          <div className="user-info__item">
            <User size={20} /> Tài Khoản Của Tôi
          </div>
          <div className="user-info__item">
            <Clipboard size={20} /> Đơn Mua
          </div>
          <div className="user-info__item">
            <Bell size={20} />
            Thông Báo
          </div>
          <div className="user-info__item">
            <DollarSign size={20} />
            Kho Voucher
          </div>
        </div>
      </Col>
      <Col span={18}>
        <div className="user-info__right">
          <Tabs defaultActiveKey="1" size="large" type="card">
            <TabPane tab="Tất Cả" key="1">
              Content of Tab Pane 1
            </TabPane>
            <TabPane tab="Chờ Xác Nhận" key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="Chờ Lấy Hàng" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Đang Giao" key="4">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Đã Giao" key="5">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Đã Hủy" key="6">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </Col>
    </Row>
  );
}

export default InfoUser;
