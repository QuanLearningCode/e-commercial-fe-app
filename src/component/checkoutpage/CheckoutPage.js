import { Outlet } from "react-router-dom";
import BannerCheckoutPage from "./BannerCheckoutPage";
import CheckoutPageDetail from "./CheckoutPageDetail";

function CheckoutPage() {
  return (
    <>
      <BannerCheckoutPage />
      <Outlet />
    </>
  );
}

export default CheckoutPage;
