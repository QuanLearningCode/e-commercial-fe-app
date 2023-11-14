import { useDispatch, useSelector } from "react-redux";

import {
  filterActions,
  navShopPageClickedActions,
} from "../homepage/store/store";

function NavShopPageConfigItem(props) {
  const dispatch = useDispatch();
  const navCategoryClicked = useSelector((state) => state.navShopPageClicked);

  let clickClassName = "";

  //Đặt điều kiện để khi click category ở trang Home và được điều hướng đến trang Shop thì các sản phẩm sẽ được hiển thị theo category đã chọn và kích hoạt kiểu category tương ứng ở thanh category bên trái của trang Shop
  if (
    navCategoryClicked.categoryClicked.toLowerCase() === "ipad" &&
    props.category === "Other"
  ) {
    clickClassName = "NavShopPage_container_category-clicked";
  } else if (
    navCategoryClicked.categoryClicked.toLowerCase() ===
    props.category.toLowerCase()
  ) {
    clickClassName = "NavShopPage_container_category-clicked";
  }

  //Xử lý sự kiện click vào từng mục category thì sẽ bắn action "lọc lại danh sách sản phẩm được hiển thị theo category"
  const categoryNavClickHandler = () => {
    dispatch(filterActions.filter_product(props.category));
    dispatch(navShopPageClickedActions.nav_click(props.category));
  };

  return (
    <li onClick={categoryNavClickHandler} className={clickClassName}>
      {props.category}
    </li>
  );
}

export default NavShopPageConfigItem;
