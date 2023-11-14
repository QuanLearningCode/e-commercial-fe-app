import "./Products.css";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import ProductItem from "./ProductItem";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

function Products() {
  const productsData = useLoaderData();

  //Thiết lập state các sản phẩm được lọc theo category
  const [product, setProduct] = useState([]);

  //Lấy ra state category được click để lọc
  const filter = useSelector((state) => state.filter.category).toLowerCase();

  //Mỗi khi trang được truy cập hoặc khi state category thay đổi thì sẽ thực thi hàm lấy dữ liệu để lọc sản phẩm theo state category
  useEffect(() => {
    if (filter === "all") {
      setProduct(productsData);
    } else if (filter === "other") {
      setProduct(
        productsData.filter(
          (cur) =>
            cur.category !== "iphone" &&
            cur.category !== "ipod" &&
            cur.category !== "macbook" &&
            cur.category !== "airpod" &&
            cur.category !== "watch" &&
            cur.category !== "mouse" &&
            cur.category !== "keyboard"
        )
      );
    } else {
      setProduct(productsData.filter((cur) => cur.category === filter));
    }
  }, [filter]);

  return (
    <>
      <div className="ProductList_container">
        <div className="ProductList_container--items">
          {product.map((prod, index) => (
            <ProductItem
              key={index}
              id={prod._id}
              image={prod.img1}
              name={prod.name}
              title={prod.name}
              price={prod.price}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;

export async function productsLoader() {
  try {
    const response = await axios({
      url: "https://e-commercial.onrender.com/products",
      method: "GET",
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 500) {
      //...
    } else {
      console.log(err);
    }
  }
}
