import "./Header.css";

import { Link, NavLink, useLoaderData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Header() {
  const userLogin = useLoaderData();

  const logoutHandler = () => {
    axios({
      url: "https://e-commercial.onrender.com/logout",
      method: "GET",
      withCredentials: true,
    })
      .then((res) => {
        if (res.status === 200) {
          window.location.replace("/");
        } else {
          throw new Error("Something's wrong!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <header>
        {/*Phần điều hướng */}
        <nav className="Header_Nav">
          <ul className="Header_navLink">
            <li>
              <NavLink
                to="/"
                style={({ isActive }) => ({
                  color: isActive ? "var(--hoverNav-text-color)" : "",
                })}
                end
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/shop"
                style={({ isActive }) => ({
                  color: isActive ? "var(--hoverNav-text-color)" : "",
                })}
                end
              >
                Shop
              </NavLink>
            </li>
          </ul>
          <h1 className="Header_storeName">BOUTIQUE</h1>
          <ul className="Header_navLink">
            <li>
              <NavLink
                to="/cart"
                style={({ isActive }) => ({
                  color: isActive ? "var(--hoverNav-text-color)" : "",
                })}
                end
              >
                <FontAwesomeIcon icon={"fa-solid fa-cart-shopping"} />
                Cart
              </NavLink>
            </li>
            {!userLogin ? (
              <li>
                <NavLink to="/login">
                  <FontAwesomeIcon icon={"fa-solid fa-user"} />
                  Login
                </NavLink>
              </li>
            ) : (
              <li>
                <span>
                  <NavLink
                    to="/orders/history"
                    style={({ isActive }) => ({
                      color: isActive ? "var(--hoverNav-text-color)" : "",
                    })}
                    end
                  >
                    <FontAwesomeIcon icon={"fa-solid fa-cubes"} />
                    Order
                  </NavLink>
                </span>
                <span>
                  <NavLink>
                    <FontAwesomeIcon icon={"fa-solid fa-user"} />
                    {userLogin.email}
                  </NavLink>
                </span>
                <span>
                  <Link onClick={logoutHandler}>( Logout )</Link>
                </span>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;

export async function headerLoader() {
  try {
    const response = await axios({
      url: "https://e-commercial.onrender.com/session",
      method: "GET",
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    if (err.response.status === 500) {
      //....
    } else {
      console.log(err);
    }
  }
}
