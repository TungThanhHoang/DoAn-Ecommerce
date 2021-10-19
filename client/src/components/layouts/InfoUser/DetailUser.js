import React, { useState, useContext } from "react";
import { Row, Col, Select } from "antd";
import "./DetailUser.css";
import country from "../../../db/ward.json";
import SelectCountry from "../SelectCountry";
import { AuthContext } from "../../../contexts/AuthContext";

function DetailUser() {
  const {
    authState: { user },
    updateUser,
  } = useContext(AuthContext);
  const [selectCountryId, setSelectCountries] = useState(null);
  const [selectStateId, setSelectState] = useState(null);
  const [infoUser, setInfoUser] = useState(user);
  const { firstname, lastname, address, phone, id, email, district, ward } =
    infoUser;
  const handleOnChange = (event) => {
    setInfoUser({
      ...infoUser,
      [event.target.name]: event.target.value,
      district: selectCountryId,
      ward: selectStateId,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const sendData = await updateUser(infoUser, id);
      if (sendData.data) {
        console.log(sendData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectCoutry = (value) => {
    setSelectState(null);
    setSelectCountries(value);
  };
  const handleSelectState = (value) => {
    setSelectState(value);
  };

  return (
    <form className="detail-user" onSubmit={handleSubmit}>
      <div className="title-top">
        <div className="title-name">Hồ Sơ Của Tôi</div>
        <span className="sub-title">Quản lý thông tin hồ sơ</span>
      </div>
      <div className="wrap-detail">
        <div className="name-user">
          <div className="card-item">
            <label className="title-input">Tên</label>
            <input
              className="input-field"
              type="text"
              value={firstname}
              name="firstname"
              onChange={handleOnChange}
            />
          </div>
          <div className="card-item">
            <label className="title-input">Họ</label>
            <input
              className="input-field"
              type="text"
              name="lastname"
              value={lastname}
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="card-item">
          <label className="title-input">Email</label>
          <input
            className="input-field"
            value={email}
            disabled
            type="text"
            name="email"
          />
        </div>
        <div className="card-item">
          <label className="title-input">Phone</label>
          <input
            className="input-field"
            type="text"
            name="phone"
            value={phone}
            onChange={handleOnChange}
          />
        </div>
        <div className="address-user">
          <div className="card-item">
            <div className="title-input">Số nhà</div>
            <input
              className="input-field"
              type="text"
              name="address"
              value={address}
              onChange={handleOnChange}
            />
          </div>
          <div className="card-item">
            <div className="title-input">Quận/Huyện</div>
            <SelectCountry
              name="district"
              options={country.countries}
              value={selectCountryId}
              onChange={handleSelectCoutry}
              handleSelectChange={handleSelectCoutry}
            />
          </div>
          <div className="card-item">
            <div className="title-input">Phường/Xã</div>
            <SelectCountry
              name="ward"
              options={country.ward.filter(
                (state) => state.countryId === selectCountryId
              )}
              value={selectStateId}
              onChange={handleSelectState}
              handleSelectChange={handleSelectState}
            />
          </div>
        </div>
      </div>
      <button className="btn-save">Lưu</button>
    </form>
  );
}

export default DetailUser;
