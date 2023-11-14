function ProductCartTotal(props) {
  const btnClickHandler = () => {};

  return (
    <div className="ProductCartTotal_container">
      <h3>CART TOTAL</h3>
      <div className="ProductCartTotal_subtotal-container">
        <p>SUBTOTAL</p>
        <p className="ProductCartTotal_subTotal_price">{`${Number(
          props.subTotalPrice
        ).toLocaleString("de-DE")} VND`}</p>
      </div>
      <div className="ProductCartTotal_total-container">
        <p>TOTAL</p>
        <p className="ProductCartTotal_total_price">{`${Number(
          props.subTotalPrice
        ).toLocaleString("de-DE")} VND`}</p>
      </div>
      <div>
        <input type="text" placeholder="Enter your coupon" />
        <button onClick={btnClickHandler}>Add coupon</button>
      </div>
    </div>
  );
}

export default ProductCartTotal;
