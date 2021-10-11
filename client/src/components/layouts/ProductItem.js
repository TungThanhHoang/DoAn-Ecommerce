import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { MapPin, ShoppingCart } from "react-feather";
import { ProductContext } from "../../contexts/ProductContext";
import { Swiper ,SwiperSlide } from "swiper/react";

function ProductItem({
  product: {
    id,
    title,
    Price,
    slug,
    size,
    picture: {
      0: { url },
    },
  },
}) {


  
  const { formatPrice, addProduct } = useContext(ProductContext);
  // const handleAddToCart = async (productId) =>{
  //   try {
  //     const addItem = await addProduct(productId  , 1)
  //     console.log(addItem);
  //   } catch (error) {
  //     console.log(error);
  //   }

  // }

  return (
    <div className="card-product__item">
      <Link to="">
        <img
          className="bg-img img-product"
          src={`http://localhost:1337` + url}
          alt=""
          style={{
            width: "100%",
            height: "170px",
            borderRadius: "10px",
          }}
        />
        <div className="title-product">{title}</div>
        <div className="address-product">
          <MapPin size={14} style={{ color: "orange" }} />
          <span>Hải châu</span>
        </div>
        <div className="main-product">
          <div className="price-product">{formatPrice.format(Price)}</div>
          <div className="weight-product">
            {size === "onebox"
              ? "Hộp"
              : size === "onebotlle"
              ? "Chai"
              : size === "fivegram"
              ? "500g"
              : ""}
          </div>
        </div>
        <button
          className="add-cart"
          onClick={(e) => {
            e.preventDefault();
            addProduct(id, 1);
          }}
        >
          <span>Thêm vào giỏ</span>
          <ShoppingCart size={18} />
        </button>
      </Link>
    </div>
  );
}

export default ProductItem;
