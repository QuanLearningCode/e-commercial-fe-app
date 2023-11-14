import "./ProductCartPage.css";

import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ProductCartPageDataTable from "./ProductCartPageDataTable";
import ProductCartTotal from "./ProductCartTotal";
import axios from "axios";

function ProductCartPage() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.quantity.quantity);
  const cartTotalPrice = cart.reduce((initialSum, product) => {
    return initialSum + Number(product.productId.price) * product.quantity;
  }, 0);

  const checkoutHandler = () => {
    const updatedCart = { updatedCart: cart };

    axios({
      url: "https://e-commercial.onrender.com/cart/update-cart",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: updatedCart,
      withCredentials: true,
    })
      .then((res) => {
        navigate("/checkout");
      })
      .catch((err) => {
        if (err.response.status === 500) {
          //....
        } else {
          console.log(err);
        }
      });
  };

  return (
    <>
      <h3 className="ProductCartPage_shopping-cart">SHOPPING CART</h3>
      <div className="ProductCartPage_list-bill">
        {/*Bảng các sản phẩm đã được thêm vào giỏ hàng */}
        <table>
          <thead>
            <tr>
              <th>IMAGE</th>
              <th>PRODUCT</th>
              <th>PRICE</th>
              <th>QUANTITY</th>
              <th>TOTAL</th>
              <th>REMOVE</th>
            </tr>
          </thead>

          {/*Dữ liệu được thêm vào mỗi hàng trong bảng */}
          <tbody>
            {cart.map((prod, index) => {
              return (
                <ProductCartPageDataTable
                  key={index}
                  image={prod.productId.img1}
                  title={prod.productId.name}
                  price={prod.productId.price}
                  quantity={prod.quantity}
                  id={prod.productId._id}
                  category={prod.productId.category}
                />
              );
            })}
          </tbody>
        </table>

        {/*Phần thông tin giá trị của tất cả sản phẩm trong giỏ */}
        <ProductCartTotal subTotalPrice={cartTotalPrice} />
      </div>

      {/*Phần điều hướng bên dưới bảng */}
      <div className="ProductCartPage_navigation">
        <Link to={"/shop"} className="ProductCartPage_navigation_nav-left">
          <FontAwesomeIcon icon={"fa-solid fa-arrow-left-long"} />
          Continue Shopping
        </Link>

        <Link
          // to={"/checkout"}
          className="ProductCartPage_navigation_nav-right"
          onClick={checkoutHandler}
        >
          Proceed to checkout
          <FontAwesomeIcon icon={"fa-solid fa-arrow-right-long"} />
        </Link>
      </div>
    </>
  );
}

export default ProductCartPage;

// export async function productCartPageLoader() {
//   try {
//     const response = await axios({
//       url: "http://localhost:5000/products/cart",
//       method: "GET",
//       withCredentials: true,
//     });
//     if (!response.data.userLogin) {
//       return redirect("/login");
//     }
//     return response.data;
//   } catch (err) {
//     if (err.response.status === 500) {
//       //....
//     } else {
//       console.log(err);
//     }
//   }
// }
