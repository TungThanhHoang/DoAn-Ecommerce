import React from "react";
import { Row, Col, Carousel } from "antd";
import { ArrowLeft, ArrowRight } from "react-feather";
import "./Poster.css";
export default function Poster() {
  const imgPoster = [
    { img: "../../../slider-1.jpg" },
    { img: "../../../slider-2.jpg" },
    { img: "../../../slider-3.jpg" },
  ];
  return (
    <div className="poster-main">
      <Row>
        <Col md={16} sm={24} xs={24}>
          <div className="poster-main__left">
            <Carousel
              autoplay
              autoplaySpeed={4000}
              speed={1000}
              pauseOnHover="true"
              dotPosition="bottom"
              arrows
              prevArrow={<ArrowLeft />}
              nextArrow={<ArrowRight />}
            >
              {imgPoster?.map((item , index) => {
                return (
                  <div key={index}>
                    <div
                      className="carousel-item bg-img"
                      style={{
                        backgroundImage: `url(${item.img})`,
                        width: "100%",
                        height: "390px",
                      }}
                    >
                      <button className="btn-buy">Mua Ngay</button>
                    </div>
                  </div>
                );
              })}
            </Carousel>
          </div>
        </Col>
        <Col md={8} xs={12}>
          <div className="poster-main__right">
            <Col>
              <div
                className="poster-main__right--item bg-img"
                style={{
                  backgroundImage: "url(../../../slider-2.jpg)",
                  width: "100%",
                  height: "190px",
                }}
              ></div>
            </Col>
            <Col>
              <div
                className="poster-main__right--item bg-img"
                style={{
                  backgroundImage: "url(../../../slider-2.jpg)",
                  width: "100%",
                  height: "190px",
                }}
              ></div>
            </Col>
          </div>
        </Col>
      </Row>
    </div>
  );
}
