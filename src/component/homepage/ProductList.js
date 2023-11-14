import "./ProductList.css";
import "./ProductPopup.css";

import { useState } from "react";
import { useSelector } from "react-redux";

import ProductListItem from "./ProductListItem";
import ProductPopup from "./ProductPopup";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

function ProductList() {
  const productsData = useLoaderData();

  //Thiết lập state danh sách các sản phẩm được hiển thị, sản phẩm được click
  const [itemClicked, setItemClicked] = useState([]);

  //Lấy state cho phép ẩn/hiện popup thông tin sản phẩm
  const show = useSelector((state) => state.popup.showPopup);

  //Hàm cập nhật sản phẩm được click
  const productclicked = (id) => {
    setItemClicked(productsData.filter((prod) => prod._id === id));
  };

  return (
    <>
      <div className="ProductList_container">
        <div className="ProductList_container--title">
          <p>MADE THE HARD WAY</p>
          <h4>TOP TRENDING PRODUCTS</h4>
        </div>

        {/*Từng sản phẩm được hiển thị, mỗi sản phẩm có một hàm lấy id sản phẩm được click */}
        <div className="ProductList_container--items">
          {productsData.map((prod, index) => (
            <ProductListItem
              key={index}
              id={prod._id}
              image={prod.img1}
              name={prod.name}
              price={prod.price}
              description={prod.long_desc}
              productclicked={productclicked}
            />
          ))}
        </div>
      </div>

      {/*Nếu state show là true thì hiện popup, nếu false thì ẩn popup*/}
      <div className="popup_container">
        {show ? (
          <div>
            <div className="popup_background"></div>
            {itemClicked.map((item, index) => (
              <ProductPopup
                key={index}
                idClicked={item._id}
                image={item.img1}
                title={item.name}
                price={item.price}
                description={item.long_desc}
                productclicked={productclicked}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default ProductList;

export async function productListLoader() {
  try {
    const response = await axios({
      url: "https://e-commercial.onrender.com/products",
      method: "GET",
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
