import React, { useEffect, useContext } from "react";
import { Row, Col, Slider, Select } from "antd";
import "./Category.css";
import "../components/layouts/Products/ProductHome.css";
import CardProduct from "../components/layouts/Products/CardProduct";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";
import CategoryProductItem from "../components/layouts/CategoryProductItem";
const { Option } = Select;
function Category() {
  const { slug, id } = useParams();
  const {
    categoryState: { category },
    loadOneCategory,
  } = useContext(CategoryContext);
  useEffect(() => {
    loadOneCategory(id);
  }, []);
  console.log(typeof category.products);
  return (
    <div className="container ">
      <Row className="category">
        <Col span={6}>
          <div className="main-left">
            <div className="pd-2">
              <div className="title-filter">Lọc theo giá</div>
              <Slider
                min={0}
                max={500000}
                range={{ draggableTrack: true }}
                defaultValue={[10000, 100000]}
              />
              <div className="result-filter">Giá từ: 10.000 - 20.000</div>
              <div className="title-filter">Lọc theo thương hiệu</div>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>Checkbox1</div>
              </div>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>Checkbox2</div>
              </div>
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>Checkbox3</div>
              </div>
            </div>
            <div className="main-left_poster">
              <img
                src="../../milk.jpg"
                alt=""
                width="100%"
                height="300px"
                className="bg-img"
              />
            </div>
          </div>
        </Col>
        <Col lg={18} sm={24}>
          <div className="main-right">
            <div
              className="bg-img"
              style={{
                backgroundImage: `url(../../banner-detail.jpg)`,
                width: "100%",
                height: "180px",
                borderRadius: 8,
              }}
            ></div>
            <div className="card-select">
              <Row justify="end" align="middle">
                <Col span={10}>
                  <div className="card-select__view">
                    <Select defaultValue={1}>
                      <Option value="Sắp xếp theo thứ tự mới nhất">
                        Sắp xếp theo thứ tự mới nhất
                      </Option>
                      <Option value="Sắp xếp theo thứ tự cũ nhất">
                        Sắp xếp theo thứ tự cũ nhất
                      </Option>
                    </Select>
                  </div>
                </Col>
              </Row>
            </div>
            <h2 className="title-view pd-1">Sản phẩm</h2>
            <Row className="box-product">
              {category.products?.map((item) => {
                return <CategoryProductItem key={item.id} product={item} />;
              })}
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Category;
