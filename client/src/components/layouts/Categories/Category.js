import { Row, Col } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./Category.css";
export default function Category() {
  const category = [
    { img: "../../../softdrinks.png", title: "Đồ Uống", path: "/drink" },
    { img: "../../../vegetable.png", title: "Rau Củ", path: "/vegatable" },
    { img: "../../../milk.png", title: "Sữa", path: "/milk" },
    { img: "../../../beef.png", title: "Thịt", path: "/beef" },
    { img: "../../../spice.png", title: "Gia Vị", path: "/spice" },
    { img: "../../../fruits1.png", title: "Trái Cây", path: "/fruit" },
    { img: "../../../seafood.png", title: "Hải Sản", path: "/seafood" },
    { img: "../../../pet-food.png", title: "Đồ Khô", path: "/dry-food" },
  ];
  return (
    <div className="category">
      <Row justify="center" align="middle">
        {category.map((item, index) => {
          return (
            <Col xl={3} md={3} sm={6} xs={6} key={index}>
              <Link to={item.path}>
                <div className="category-card">
                  <div
                    className=" bg-img"
                    style={{
                      backgroundImage: `url(${item.img})`,
                      width: "50px",
                      height: "50px",
                    }}
                  ></div>
                  <div className="category-card__title">{item.title}</div>
                </div>
              </Link>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}
