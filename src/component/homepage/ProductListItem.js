import { useDispatch } from "react-redux";

import { popupActions } from "./store/store";

function ProductListItem(props) {
  const dispatch = useDispatch();

  //Xử lý sự kiện khi click vào hình ảnh hoặc tiêu đề sản phẩm thì bắn action "hiện popup thông tin sản phẩm" -> state là true, và gửi về id sản phẩm được click
  const productClickHandler = () => {
    dispatch(popupActions.show_popup());
    props.productclicked(props.id);
  };

  return (
    <>
      <div>
        <img src={props.image} alt={props.name} onClick={productClickHandler} />
        <h4 onClick={productClickHandler}>{props.name}</h4>
        <p>{`${Number(props.price).toLocaleString("de-DE")} VND`}</p>
      </div>
    </>
  );
}

export default ProductListItem;
