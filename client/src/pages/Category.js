import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Slider, Select } from "antd";
import "./Category.css";
import { useParams } from "react-router-dom";
import { CategoryContext } from "../contexts/CategoryContext";
import CategoryProductItem from "../components/layouts/CategoryProductItem";
import { ProductContext } from "../contexts/ProductContext";
const { Option } = Select;
function Category() {
  const { id } = useParams();
  const {
    categoryState: { category },
    loadOneCategory,
  } = useContext(CategoryContext);
  const { formatPrice } = useContext(ProductContext);

  const [CountPrice, setCountPrice] = useState([0,100000]);

  useEffect(() => {
    loadOneCategory(id);
  }, []);

  const handleOnChange = (input) => {
    setCountPrice(input);
  };
  return (
    <div className="container ">
      <Row className="category">
        <Col lg={6} xl={6}>
          <div className="main-left">
            <div className="pd-2">
              <h3 className="title-filter">Lọc theo giá</h3>
              <Slider
                min={0}
                max={500000}
                range={{ draggableTrack: false }}
                defaultValue={[0, 100000]}
                onChange={handleOnChange}
              />
              <div className="result-filter">
                Giá từ: {formatPrice.format(CountPrice[0])} - {formatPrice.format(CountPrice[1])}
              </div>
              <h3 className="title-filter">Lọc theo thương hiệu</h3>
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
              <div className="checkbox-filter">
                <input type="checkbox" />
                <div>Checkbox4</div>
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
        <Col xs={24} sm={24} md={24} lg={18} xl={18}>
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
                <Col xs={24} md={12} lg={12} xl={12}>
                  <div className="card-select__view">
                    <Select defaultValue="Sắp xếp theo thứ tự mới nhất">
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
