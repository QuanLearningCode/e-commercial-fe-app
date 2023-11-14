import { Outlet } from "react-router-dom";
import "./ContentShopPage.css";

import ContentShopPageFilter from "./ContentShopPageFilter";

function ContentShopPage() {
  return (
    <div className="ContentShopPage_container">
      <ContentShopPageFilter />
      <Outlet />
    </div>
  );
}

export default ContentShopPage;
