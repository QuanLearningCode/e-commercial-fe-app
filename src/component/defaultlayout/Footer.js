import "./Footer.css";

import FooterItem from "./FooterItem";

//Danh sách các đường dẫn điều hướng của Footer
const footerItems = [
  {
    title: "CUSTOMER SERVICES",
    navItem: [
      "Help & Contact Us",
      "Returns & Refunds",
      "Online Stores",
      "Terms & Conditions",
    ],
  },
  {
    title: "COMPANY",
    navItem: ["What We Do", "Available Services", "Latest Posts", "FAQs"],
  },
  {
    title: "SOCIAL MEDIA",
    navItem: ["Twitter", "Instagram", "Facebook", "Pinterest"],
  },
];

function Footer() {
  return (
    <>
      <footer>
        {footerItems.map((item, index) => (
          <FooterItem key={index} title={item.title} link={item.navItem} />
        ))}
      </footer>
    </>
  );
}

export default Footer;
