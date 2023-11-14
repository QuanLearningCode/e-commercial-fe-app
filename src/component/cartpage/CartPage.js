import { Outlet } from "react-router-dom";
import BannerCartPage from "./BannerCartPage";

function CartPage() {
  return (
    <>
      <BannerCartPage />
      <Outlet />
    </>
  );
}

export default CartPage;
