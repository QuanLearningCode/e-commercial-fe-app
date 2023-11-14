import "./ProductCartPage.css";

import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { quantityActions } from "../homepage/store/store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProductCartPageDataTable(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.quantity.quantity);
  const productQuantity = cart.find(
    (prod) => prod.productId._id === props.id
  ).quantity;

  //Xử lý sự kiện xoá sản phẩm trong giỏ
  const deleteClickHandler = async () => {
    await axios({
      url: "https://e-commercial.onrender.com/cart/delete-product/" + props.id,
      method: "POST",
      withCredentials: true,
    });
    navigate("/cart");
  };

  //Xử lý sự kiện tăng/giảm số lượng sản phẩm và cập nhật giỏ hàng
  const decreaseQuantityClickHandler = () => {
    dispatch(quantityActions.decrease_quantity(props.id));
  };

  const increaseQuantityClickHandler = () => {
    dispatch(quantityActions.increase_quantity(props.id));
  };

  return (
    <tr>
      <td>
        <img
          src={props.image}
          alt={props.category}
          className="ProductCartPage_img"
        />
      </td>
      <td className="ProductCartPage_title">{props.title}</td>
      <td className="ProductCartPage_price">{`${Number(
        props.price
      ).toLocaleString("de-DE")} VND`}</td>
      <td className="ProductCartPage_quantity">
        <FontAwesomeIcon
          icon={"fa-solid fa-caret-left"}
          onClick={decreaseQuantityClickHandler}
        />
        <span>{productQuantity}</span>
        <FontAwesomeIcon
          icon={"fa-solid fa-caret-right"}
          onClick={increaseQuantityClickHandler}
        />
      </td>
      <td className="ProductCartPage_price">{`${Number(
        props.price * Number(productQuantity)
      ).toLocaleString("de-DE")} VND`}</td>
      <td className="ProductCartPage_delete" onClick={deleteClickHandler}>
        <FontAwesomeIcon icon={"fa-solid fa-trash-can"} />
      </td>
    </tr>
  );
}

export default ProductCartPageDataTable;
