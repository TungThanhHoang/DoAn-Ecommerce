import { Row, Col } from "antd";
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "../../../contexts/CategoryContext";
import { apiUrl } from "../../../contexts/constants";
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
  const {
    categoryState: { categories },
    loadCategory,
  } = useContext(CategoryContext);
  useEffect(() => {
    loadCategory();
  }, []);
  console.log(categories.title);
  return (
    <div className="category">
      <Row justify="center" align="middle">
        {categories.map((item, index) => {
          return (
            <Col xl={3} md={3} sm={6} xs={6} key={index}>
              <Link
                to={{
                  pathname: `categories/${item.slug}/${item.id}`,
                }}
              >
                <div className="category-card">
                  <div
                    className=" bg-img "
                    style={{
                      backgroundImage: `url(${apiUrl}${item.image.url})`,
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
