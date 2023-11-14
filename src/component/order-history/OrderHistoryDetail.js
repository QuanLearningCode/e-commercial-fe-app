import axios from "axios";
import "./OrderHistoryDetail.css";
import { useLoaderData } from "react-router-dom";

export default function OrderHistoryDetail() {
  const orderDetail = useLoaderData();

  return (
    <div className="OrderDetail_container">
      <div className="OrderDetail_infor">
        <h2>INFORMATION ORDER</h2>
        <div className="OrderDetail_user-infor">
          <p>
            <span>ID User: </span>
            <span>{orderDetail.userId}</span>
          </p>
          <p>
            <span>Full Name: </span>
            <span>{orderDetail.fullName}</span>
          </p>
          <p>
            <span>Phone: </span>
            <span>{orderDetail.phone}</span>
          </p>
          <p>
            <span>Address: </span>
            <span>{orderDetail.address}</span>
          </p>
          <p>
            <span>Total: </span>
            <span>{orderDetail.total}</span>
          </p>
        </div>
      </div>
      <table className="OrderDetail_table">
        <thead>
          <tr>
            <th>ID PRODUCT</th>
            <th>IMAGE</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>COUNT</th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.products.map((prod, index) => {
            return (
              <tr key={index}>
                <td>{prod.product._id}</td>
                <td>
                  <img src={prod.product.img1} alt={prod.product.name} />
                </td>
                <td>{prod.product.name}</td>
                <td>{`${Number(prod.product.price).toLocaleString(
                  "de-DE"
                )} VND`}</td>
                <td>{prod.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export async function orderHistoryDetailLoader({ request, params }) {
  const orderId = params.orderId;
  try {
    const response = await axios({
      url: "https://e-commercial.onrender.com/orders/order/" + orderId,
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
