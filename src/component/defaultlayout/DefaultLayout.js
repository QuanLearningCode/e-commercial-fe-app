import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LiveChartPage from "../livechartpage/LiveChartPage";

function DefaultLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <LiveChartPage />
      <Footer />
    </>
  );
}

export default DefaultLayout;
