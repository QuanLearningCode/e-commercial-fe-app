import { Link } from "react-router-dom";

function ProductItem(props) {
  return (
    <div>
      <Link to={`/detail/${props.id}`}>
        <img src={props.image} alt={props.name} />
        <h4>{props.title}</h4>
      </Link>
      <p>{`${Number(props.price).toLocaleString("de-DE")} VND`}</p>
    </div>
  );
}

export default ProductItem;
