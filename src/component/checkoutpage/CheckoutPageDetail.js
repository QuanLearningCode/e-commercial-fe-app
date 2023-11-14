import { useState } from "react";
import "./CheckoutPageDetail.css";

import { Form, useLoaderData, useNavigate } from "react-router-dom";
import axios from "axios";

function CheckoutPageDetail() {
  const checkoutProducts = useLoaderData();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(checkoutProducts.userLogin.fullName);
  const [email, setEmail] = useState(checkoutProducts.userLogin.email);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const [error, setError] = useState(null);

  const checkoutTotalPrice = checkoutProducts.cart.reduce(
    (initialSum, product) => {
      return (
        initialSum + Number(product.productId.price * Number(product.quantity))
      );
    },
    0
  );

  const buyClickHandler = () => {
    const orderData = {
      userId: checkoutProducts.userLogin.userId,
      fullName: fullName,
      email: email,
      phone: phone,
      address: address,
      products: checkoutProducts.cart,
      totalPrice: checkoutTotalPrice,
      date: new Date(),
      status: "Waiting for Pay",
    };

    if (
      !orderData.fullName.trim() ||
      !orderData.email ||
      !orderData.phone ||
      !orderData.address.trim()
    ) {
      setError("Inputs required");
    } else if (
      isNaN(orderData.phone) ||
      orderData.phone.length < 10 ||
      orderData.phone.length > 10
    ) {
      setError("Invalid Phone Number");
    } else {
      axios({
        url: "https://e-commercial.onrender.com/orders/add-order",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        data: orderData,
        withCredentials: true,
      })
        .then((res) => {
          window.alert("Successful Ordering");
          navigate("/shop");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <h3 className="CheckoutPageDetail_billing-detail">BILLING DETAILS</h3>
      <div className="CheckoutPageDetail_container">
        {/*Biểu mẫu lấy thông tin đặt đơn hàng */}
        <div className="CheckoutPageDetail_form">
          <Form noValidate>
            {error ? <p className="checkoutForm_error">{error}</p> : ""}
            <div>
              <label htmlFor="">FULL NAME:</label>
              <input
                type="text"
                placeholder="Enter Your Full Name Here!"
                spellCheck="false"
                value={fullName}
                onChange={(e) => {
                  setError(null);
                  setFullName(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">EMAIL:</label>
              <input
                type="text"
                placeholder="Enter Your Email Here!"
                spellCheck="false"
                value={email}
                onChange={(e) => {
                  setError(null);
                  setEmail(e.target.value.trim());
                }}
              />
            </div>
            <div>
              <label htmlFor="">PHONE NUMBER:</label>
              <input
                type="text"
                placeholder="Enter Phone Number Here!"
                spellCheck="false"
                value={phone}
                onChange={(e) => {
                  setError(null);
                  setPhone(e.target.value);
                }}
              />
            </div>
            <div>
              <label htmlFor="">ADDRESS:</label>
              <input
                type="text"
                placeholder="Enter Your Address Here!"
                spellCheck="false"
                value={address}
                onChange={(e) => {
                  setError(null);
                  setAddress(e.target.value);
                }}
              />
            </div>
            <button onClick={buyClickHandler}>Place order</button>
          </Form>
        </div>

        {/*Thông tin tổng giá trị đơn hàng */}
        <div className="CheckoutPageDetail_order-container">
          <h3>YOUR ORDER</h3>
          {checkoutProducts.cart.map((prod, index) => {
            return (
              <div
                key={index}
                className="CheckoutPageDetail_order-product-container"
              >
                <p className="CheckoutPageDetail_order-product-title">
                  {prod.productId.name}
                </p>
                <p className="CheckoutPageDetail_order-product-price">
                  <span>{`${Number(prod.productId.price).toLocaleString(
                    "de-DE"
                  )} VND`}</span>
                  <span> x </span>
                  <span>{prod.quantity}</span>
                </p>
              </div>
            );
          })}
          <div className="CheckoutPageDetail_order-total-container">
            <p className="CheckoutPageDetail_order-total-title">TOTAL</p>
            <p className="CheckoutPageDetail_order-total-price">{`${Number(
              checkoutTotalPrice
            ).toLocaleString("de-DE")} VND`}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckoutPageDetail;

export async function checkoutPageDetailLoader() {
  try {
    const response = await axios({
      url: "https://e-commercial.onrender.com/products/cart",
      method: "GET",
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 500) {
      //....
    } else {
      console.log(err);
    }
  }
}
