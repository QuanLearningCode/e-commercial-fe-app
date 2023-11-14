import "./MoreInformation.css";

function MoreInformation() {
  return (
    <div>
      <div className="MoreInformation_top">
        <div>
          <h4>FREE SHIPPING</h4>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h4>24 X 7 SERVICE</h4>
          <p>Free shipping worldwide</p>
        </div>
        <div>
          <h4>FESTIVAL OFFER</h4>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div className="MoreInformation_bottom">
        <div>
          <h4>LET'S BE FRIENDS!</h4>
          <p>Nisi nisi tempor consequat laboris nisi.</p>
        </div>
        <div>
          <input type="text" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </div>
  );
}

export default MoreInformation;
