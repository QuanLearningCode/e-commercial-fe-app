import { Outlet } from "react-router-dom";
import BannerOrderHistory from "./BannerOrderHistory";

function OrderHistory() {
  return (
    <>
      <BannerOrderHistory />
      <Outlet />
    </>
  );
}

export default OrderHistory;
