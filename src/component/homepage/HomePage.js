import Banner from "./Banner";
import ProductCategories from "./ProductCategories";
import MoreInformation from "./MoreInformation";
import { Outlet } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Banner />
      <ProductCategories />
      <Outlet />
      <MoreInformation />
    </>
  );
}

export default HomePage;
