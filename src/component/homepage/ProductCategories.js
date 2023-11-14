import "./ProductCategories.css";

import product1 from "./image/product_1.png";
import product2 from "./image/product_2.png";
import product3 from "./image/product_3.png";
import product4 from "./image/product_4.png";
import product5 from "./image/product_5.png";

import ProductCategoriesImg from "./ProductCategoriesImg";

//Lưu danh sách hình ảnh vào array
const productCategoryImage = [
  {
    category: "iphone",
    image: product1,
  },
  {
    category: "macbook",
    image: product2,
  },
  {
    category: "ipad",
    image: product3,
  },
  {
    category: "watch",
    image: product4,
  },
  {
    category: "airpod",
    image: product5,
  },
];

function ProductCategories() {
  return (
    <div className="ProductCategories_container">
      <p>CAREFULLY CREATED COLLECTIONS</p>
      <h4>BROWSE OUR CATEGORIES</h4>
      <div className="ProductCategories_img">
        {productCategoryImage.map((category, index) => {
          return (
            <ProductCategoriesImg
              image={category.image}
              category={category.category}
              alt={category.category}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ProductCategories;
