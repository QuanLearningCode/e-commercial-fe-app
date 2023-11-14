import "./Banner.css";

import { useNavigate } from "react-router-dom";

function Banner() {
  const navigate = useNavigate();

  //Xử lý sự kiện click nút thì điều hướng về trang Shop
  const buttonClickHandler = () => {
    navigate("/shop");
  };

  return (
    <div className="Banner_container">
      <div>
        <h4>NEW INSPIRATION 2020</h4>
        <h2>20% OFF ON NEW SEASON</h2>
        <button onClick={buttonClickHandler}>Browse collections</button>
      </div>
    </div>
  );
}

export default Banner;
