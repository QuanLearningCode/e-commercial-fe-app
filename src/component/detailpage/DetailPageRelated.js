import "./DetailPage.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function DetailPageRelated(props) {
  //Thiết lập state sản phẩm liên quan
  const [relatedProduct, setRelatedProduct] = useState([]);

  //Hàm lấy dữ liệu từ server và lọc ra các sản phẩm có cùng category làm "các sản phẩm liên quan"
  const productFetch = async (category) => {
    try {
      const response = await fetch(
        "https://e-commercial.onrender.com/products"
      );
      const data = await response.json();

      //Cập nhật state các sản phẩm liên quan bằng cách lọc từ dữ liệu server theo category
      setRelatedProduct(
        data.filter((prod) => {
          return prod.category === category;
        })
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  //Mỗi khi trang Chi tiết sản phẩm được truy cập hoặc khi có thay đổi trong giá trị category sẽ render lại trang, mỗi khi truy cập trang hoặc render lại trang thì sẽ thực thi hàm lấy dữ liệu ở trên
  useEffect(() => {
    productFetch(props.category);
  }, [props.category]);

  return (
    <>
      <p className="RelatedProduct_section-title">RELATED PRODUCTS</p>

      <div className="RelatedProduct_container">
        {relatedProduct.map((prod, index) => {
          return (
            <div key={index} className="RelatedProduct_product">
              <Link
                to={`/detail/${prod._id}`}
                onClick={() => {
                  props.onSwitchProduct();
                }}
              >
                <img
                  src={prod.img1}
                  alt={prod.name}
                  className="RelatedProduct_img"
                />
                <p className="RelatedProduct_title">{prod.name}</p>
              </Link>
              <p className="RelatedProduct_price">{`${Number(
                prod.price
              ).toLocaleString("de-DE")} VND`}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default DetailPageRelated;
