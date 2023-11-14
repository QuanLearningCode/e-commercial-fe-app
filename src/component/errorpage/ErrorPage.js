import "./ErrorPage.css";

// import DefaultLayout from "../defaultlayout/DefaultLayout";
// import { Outlet } from "react-router-dom";
import Header from "../defaultlayout/Header";

function ErrorPage() {
  return (
    <>
      <Header />
      <div className="ErrorPage_content">
        <h1>Page Not Found!</h1>
      </div>
    </>
  );
}

export default ErrorPage;
