import React from "react";
import Slider from "react-slick";
import { MapPin, ShoppingCart , ArrowRight } from "react-feather";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./NewProducts.css";
const products = [
  { img: "../../../nho.jpg", name: "Sữa tươi không đường nguyên chất", price: "20.000" },
  { img: "../../../nho.jpg", name: "Khô gà", price: "20.000" },
  { img: "../../../nho.jpg", name: "Cam ngọt", price: "20.000" },
  { img: "../../../nho.jpg", name: "Quýt không đường", price: "20.000" },
  { img: "../../../nho.jpg", name: "Cocacola không đường", price: "20.000" },
  { img: "../../../nho.jpg", name: "Dưa hấu không đường", price: "20.000" },
];

function NewProducts() {
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 300,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="card-new__main">
      <div className="card-header">
        <div className="card-new__title"> Sản Phẩm Mới </div>
        <Link><div className="view-all__product"> <span> Xem Tất Cả</span> <ArrowRight size={20}/></div></Link>
      </div>
      <Slider {...settings}>
        {products.map((item) => {
          return (
            <div className="card-product__item">
              <Link to="">
                <img
                  className="bg-img img-product"
                  src={item.img}
                  alt=""
                  style={{
                    width: "100%",
                    height: "170px",
                    borderRadius: "10px",
                  }}
                />
                <div className="title-product">{item.name}</div>
                <div className="address-product">
                  <MapPin size={14} style={{ color: "orange" }} />
                  <span>Hải châu</span>
                </div>
                <div className="main-product">
                  <div className="price-product">{item.price}</div>
                  <div className="weight-product">500g</div>
                </div>
                <button className="add-cart">
                  <span>Thêm vào giỏ</span> <ShoppingCart size={18} />
                </button>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}

export default NewProducts;
