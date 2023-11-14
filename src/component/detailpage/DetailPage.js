import "./DetailPage.css";

import { useEffect, useState } from "react";
import {
  useActionData,
  useLoaderData,
  useNavigate,
  useSubmit,
} from "react-router-dom";

import DetailPageRelated from "./DetailPageRelated";
import axios from "axios";

function DetailPage() {
  const detailProductData = useLoaderData();
  const resAddToCart = useActionData();

  //Thiết lập các state cho sản phẩm được click, số lượng nhập vào input, hiện/ẩn thông báo
  const [quantityInput, setQuantityInput] = useState("");
  const [status, setStatus] = useState(null);

  const navigate = useNavigate();
  const submit = useSubmit();

  //Xử lý sự kiện click nút Add to cart thì sẽ kiểm tra xem các điều kiện input không hợp lệ thì hiện thông báo, nếu input hợp lệ thì hiện thông báo, thêm sản phẩm đó vào danh sách sản phẩm đang có trong giỏ hàng, bắn action "Thêm vào giỏ hàng" để cập nhật lại state
  const addCartClickHandler = () => {
    if (!detailProductData.userLogin) {
      navigate("/login");
    } else if (!quantityInput) {
      setStatus("Quantity required");
    } else if (quantityInput === "0" || isNaN(quantityInput)) {
      setStatus("Invalid input");
    } else if (detailProductData.product.quantity === 0) {
      setStatus("Out of Stock");
    } else if (detailProductData.product.quantity < quantityInput) {
      setStatus("Not enough quantity");
    } else {
      const addToCart = {
        productId: detailProductData.product._id,
        quantity: quantityInput,
      };
      submit(addToCart, { method: "POST" });
    }
  };

  useEffect(() => {
    if (detailProductData.product.quantity === 0) {
      setStatus("Out of Stock");
    }
    if (resAddToCart) {
      setStatus(resAddToCart.msg);
    }
  }, [resAddToCart, detailProductData.product.quantity]);

  return (
    <>
      <div className="DetailPage_infor-container">
        <div className="DetailPage_sub-img">
          <img
            src={detailProductData.product.img1}
            alt={detailProductData.product.name}
          />
          <img
            src={detailProductData.product.img2}
            alt={detailProductData.product.name}
          />
          <img
            src={detailProductData.product.img3}
            alt={detailProductData.product.name}
          />
        </div>
        <img
          src={detailProductData.product.img4}
          alt={detailProductData.product.name}
          className="DetailPage_main-img"
        />
        <div className="DetailPage_content">
          <h4 className="DetailPage_content_title">
            {detailProductData.product.name}
          </h4>
          <p className="DetailPage_content_price">{`${Number(
            detailProductData.product.price
          ).toLocaleString("de-DE")} VND`}</p>
          <p className="DetailPage_content_description">
            {detailProductData.product.short_desc}
          </p>
          <p>
            <span className="DetailPage_content_category-title">
              CATEGORY:{" "}
            </span>
            <span className="DetailPage_content_category-name">
              {detailProductData.product.category}
            </span>
          </p>
          <div className="DetailPage_content_purchase">
            <input
              type="text"
              placeholder="QUANTITY"
              value={quantityInput}
              onChange={(e) => {
                setStatus(null);
                setQuantityInput(e.target.value.trim());
              }}
            />
            <button onClick={addCartClickHandler}>Add to cart</button>
            {status ? (
              <p
                className={
                  status.includes("Adding")
                    ? "successful-add-cart"
                    : "invalid-input"
                }
              >
                {status}
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      <div className="DetailPage_description-container">
        <button>DESCRIPTION</button>
        <div className="DetailPage_description_container-inner">
          <p className="DetailPage_description_container-inner_title">
            PRODUCT DESCRIPTION
          </p>
          <p className="DetailPage_description_container-inner_content">
            {detailProductData.product.long_desc}
          </p>
        </div>
      </div>

      {/*Phần "Các sản phẩm liên quan" */}
      <DetailPageRelated
        category={detailProductData.product.category}
        id={detailProductData.product._id}
        onSwitchProduct={() => {
          setStatus(null);
          setQuantityInput("");
        }}
      />
    </>
  );
}

export default DetailPage;

export async function detailPageLoader({ request, params }) {
  try {
    const response = await axios({
      url: "https://e-commercial.onrender.com/detail/" + params.productId,
      method: "GET",
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 500) {
      // ....
    } else {
      console.log(err);
    }
  }
}

export async function addToCartAction({ request, params }) {
  try {
    const requestData = await request.formData();
    const addToCart = {
      productId: requestData.get("productId"),
      quantity: requestData.get("quantity"),
    };
    const response = await axios({
      url: "https://e-commercial.onrender.com/products/add-to-cart",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: addToCart,
      withCredentials: true,
    });
    return { msg: "Successful Adding" };
  } catch (err) {
    if (err.response.status === 500) {
      //....
    } else {
      console.log(err);
    }
  }
}
