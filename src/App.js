import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import HomePage from "./component/homepage/HomePage";
import ShopPage from "./component/shoppage/ShopPage";
import DetailPage, {
  addToCartAction,
  detailPageLoader,
} from "./component/detailpage/DetailPage";
import CartPage from "./component/cartpage/CartPage";
import CheckoutPage from "./component/checkoutpage/CheckoutPage";
import LoginPage from "./component/loginpage/LoginPage";
import RegisterPage from "./component/registerpage/RegisterPage";
import DefaultLayout from "./component/defaultlayout/DefaultLayout";
import ErrorPage from "./component/errorpage/ErrorPage";
import "./App.css";

import { headerLoader } from "./component/defaultlayout/Header";
import ProductCartPage from "./component/cartpage/ProductCartPage";
import CheckoutPageDetail, {
  checkoutPageDetailLoader,
} from "./component/checkoutpage/CheckoutPageDetail";
import ProductList, {
  productListLoader,
} from "./component/homepage/ProductList";
import ContentShopPage from "./component/shoppage/ContentShopPage";
import Products, { productsLoader } from "./component/shoppage/Products";
import { useDispatch } from "react-redux";
import { quantityActions } from "./component/homepage/store/store";
import axios from "axios";
import OrderHistory from "./component/order-history/OrderHistory";
import ProductOrderHistory, {
  productOrderHistoryLoader,
} from "./component/order-history/ProductOrderHistory";
import OrderHistoryDetail, {
  orderHistoryDetailLoader,
} from "./component/order-history/OrderHistoryDetail";

function App() {
  const dispatch = useDispatch();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      loader: headerLoader,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          children: [
            {
              index: true,
              element: <ProductList />,
              loader: productListLoader,
            },
          ],
        },
        {
          path: "/shop",
          element: <ShopPage />,
          children: [
            {
              path: "/shop",
              element: <ContentShopPage />,
              children: [
                { index: true, element: <Products />, loader: productsLoader },
              ],
            },
          ],
        },
        {
          path: "/detail/:productId",
          element: <DetailPage />,
          loader: detailPageLoader,
          action: addToCartAction,
        },
        {
          path: "/cart",
          element: <CartPage />,
          children: [
            {
              index: true,
              element: <ProductCartPage />,
              loader: async () => {
                try {
                  const response = await axios({
                    url: "https://e-commercial.onrender.com/products/cart",
                    method: "GET",
                    withCredentials: true,
                  });
                  if (!response.data.userLogin) {
                    return redirect("/login");
                  }
                  dispatch(quantityActions.addCart(response.data.cart));
                  return response.data;
                } catch (err) {
                  if (err.response.status === 500) {
                    //....
                  } else {
                    console.log(err);
                  }
                }
              },
            },
          ],
        },
        {
          path: "/checkout",
          element: <CheckoutPage />,
          children: [
            {
              index: true,
              element: <CheckoutPageDetail />,
              loader: checkoutPageDetailLoader,
            },
          ],
        },
        {
          path: "/orders/history",
          element: <OrderHistory />,
          children: [
            {
              index: true,
              element: <ProductOrderHistory />,
              loader: productOrderHistoryLoader,
            },
            {
              path: "order-detail/:orderId",
              element: <OrderHistoryDetail />,
              loader: orderHistoryDetailLoader,
            },
          ],
        },
      ],
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
