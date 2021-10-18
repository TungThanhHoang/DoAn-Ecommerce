import React from "react";
import "./Banner.css";
function Banner() {
  return (
    <div>
      <div style={{ width: "100%" }}>
        <div className="banner-covid">
          <div className="banner-title">
            <div>Giao Hàng An Toàn</div>
            <div>
              Nhận hàng đảm bảo phòng chống dịch bệnh, bằng quét mã QR code
            </div>
          </div>
          <div
          className="bg-img banner-img"
            style={{
              backgroundImage: "url(../../../banner-covid.jpg)",
              height: "100px",
              width: "180px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
export default Banner;
