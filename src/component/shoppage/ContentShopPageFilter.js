import "./ContentShopPageFilter.css";

function ContentShopPageFilter() {
  return (
    <div className="ContentShopPageFilter_container">
      <div>
        <input type="text" placeholder="Enter Search Here!" />
      </div>
      <div>
        <select>
          <option value="">Default sorting</option>
          <option value="newest">Newest</option>
          <option value="price-low-to-high">Price: Low to High</option>
          <option value="price-high-to-low">Price: High to Low</option>
          <option value="ascending">Ascending</option>
          <option value="descending">Descending</option>
        </select>
      </div>
    </div>
  );
}

export default ContentShopPageFilter;
