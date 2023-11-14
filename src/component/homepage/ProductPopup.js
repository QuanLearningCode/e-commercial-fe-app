import "./ProductPopup.css";

import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { popupActions } from "./store/store";
import { Link } from "react-router-dom";

function ProductPopup(props) {
  const dispatch = useDispatch();

  //Xử lý sự kiện click vào nút close popup thì bắn action "ẩn popup thông tin sản phẩm" -> state là false
  const closeBtnClickHandler = () => {
    dispatch(popupActions.hide_popup());
  };

  return (
    <div className="ProductPopup_container">
      <img src={props.image} alt="product-detail" />
      <div>
        <h4 className="ProductPopup_content--title">{props.name}</h4>
        <p className="ProductPopup_content--price">{`${Number(
          props.price
        ).toLocaleString("de-DE")} VND`}</p>
        <p className="ProductPopup_content--description">{props.description}</p>
        <button className="ProductPopup_content--button">
          <Link to={`/detail/${props.idClicked}`}>
            <FontAwesomeIcon icon={"fa-solid fa-cart-shopping"} />
            View Detail
          </Link>
        </button>

        <div className="ProductPopup_closeBtn" onClick={closeBtnClickHandler}>
          X
        </div>
      </div>
    </div>
  );
}

export default ProductPopup;
