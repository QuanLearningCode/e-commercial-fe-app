import "./NavShopPage.css";

import NavShopPageConfig from "./NavShopPageConfig";

//Danh sách các mục category trong trang Shop được lưu vào mảng
const navList = [
  {
    title: "APPLE",
    category: ["All"],
  },
  {
    title: "IPHONE & MAC",
    category: ["IPhone", "Ipod", "Macbook"],
  },
  {
    title: "WIRELESS",
    category: ["Airpod", "Watch"],
  },
  {
    title: "OTHER",
    category: ["Mouse", "Keyboard", "Other"],
  },
];

function NavShopPage() {
  return (
    <nav className="NavShopPage_container">
      <h3>CATEGORIES</h3>
      <div>
        {navList.map((nav, index) => {
          return (
            <NavShopPageConfig
              key={index}
              title={nav.title}
              category={nav.category}
              className={"NavShopPage_apple"}
            />
          );
        })}
      </div>
    </nav>
  );
}

export default NavShopPage;
