import "./ProductOrderHistory.css";
import { useLoaderData, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function ProductOrderHistory() {
  const orders = useLoaderData();

  const navigate = useNavigate();

  return (
    <>
      {/*Bảng các sản phẩm đã được thêm vào giỏ hàng */}
      <table className="ProductOrderHistory_table">
        <thead>
          <tr>
            <th>ID ORDER</th>
            <th>ID USER</th>
            <th>NAME</th>
            <th>PHONE</th>
            <th>ADDRESS</th>
            <th>TOTAL</th>
            <th>DELIVERY</th>
            <th>STATUS</th>
            <th>DETAIL</th>
          </tr>
        </thead>

        {/*Dữ liệu được thêm vào mỗi hàng trong bảng */}
        <tbody>
          {orders.map((prod, index) => {
            return (
              <tr key={index}>
                <td>{prod._id}</td>
                <td>{prod.user}</td>
                <td>{prod.fullName}</td>
                <td>{prod.phone}</td>
                <td>{prod.address}</td>
                <td>{`${prod.totalPrice.toLocaleString("de-DE")} VND`}</td>
                <td>{prod.delivery}</td>
                <td>{prod.status}</td>
                <td>
                  <button
                    className="Order_detail"
                    onClick={() => {
                      navigate("/orders/history/order-detail/" + prod._id);
                    }}
                  >
                    View
                    <FontAwesomeIcon icon={"fa-solid fa-arrow-right-long"} />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/*Phần thông tin giá trị của tất cả sản phẩm trong giỏ */}
      {/* <ProductCartTotal subTotalPrice={cartTotalPrice} /> */}

      {/*Phần điều hướng bên dưới bảng */}
      {/* <div className="ProductCartPage_navigation">
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
      </div> */}
    </>
  );
}

export default ProductOrderHistory;

export async function productOrderHistoryLoader() {
  try {
    const response = await axios({
      url: "https://e-commercial.onrender.com/orders",
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
