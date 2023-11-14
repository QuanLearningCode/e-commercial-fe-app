function FooterItem(props) {
  return (
    <>
      <div>
        <h4>{props.title}</h4>
        <ul>
          {props["link"].map((link, index) => (
            <li key={index}>
              <a href="https://react.dev/" target="_blank" rel="noreferrer">
                {link}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default FooterItem;
