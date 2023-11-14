import "./ProductCategories.css";

import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { filterActions, navShopPageClickedActions } from "./store/store";

function ProductCategoriesImg(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Xử lý sự kiện click vào hình ảnh thì điều hướng đến trang Shop
  const categoryClickHandler = () => {
    dispatch(filterActions.filter_product(props.category));
    dispatch(navShopPageClickedActions.nav_click(props.category.toLowerCase()));
    navigate("/shop");
  };

  return (
    <img src={props.image} alt={props.alt} onClick={categoryClickHandler} />
  );
}

export default ProductCategoriesImg;
