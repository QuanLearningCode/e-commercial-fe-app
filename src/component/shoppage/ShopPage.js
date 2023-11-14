import "./ShopPage.css";

import BannerShopPage from "./BannerShopPage";
import NavShopPage from "./NavShopPage";
import { Outlet } from "react-router-dom";

function ShopPage() {
  return (
    <>
      <BannerShopPage />
      <div className="ShopPage_content--container">
        <NavShopPage />
        <Outlet />
      </div>
    </>
  );
}

export default ShopPage;
