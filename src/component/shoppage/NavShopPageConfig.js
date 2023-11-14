import NavShopPageConfigItem from "./NavShopPageConfigItem";

function NavShopPageConfig(props) {
  return (
    <>
      <h4 className={props.title === "APPLE" ? props.className : ""}>
        {props.title}
      </h4>
      <ul>
        {props["category"].map((category, index) => {
          return <NavShopPageConfigItem category={category} key={index} />;
        })}
      </ul>
    </>
  );
}

export default NavShopPageConfig;
