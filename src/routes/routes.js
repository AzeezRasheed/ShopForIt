import AuthLayout from "../layouts/AuthLayout";
import BackgroundLayout from "../layouts/BackgroundLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import productsRoute from "./productsRoutes";
import checkoutRoutes from "./checkoutRoutes";
import ContactUs from "../pages/Contact/ContactUs";
import Success from "../pages/SuccessPayent/Success";
import Carts from "../pages/Cart/Cart";

let routes = [
  {
    element: <BackgroundLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
      },
      {
        path: "/contact-us",
        element: <ContactUs />,
      },
      {
        path: "/payment/success",
        element: <Success />,
      },
      {
        path: "/cart",
        element: <Carts />,
      },
      productsRoute,
      checkoutRoutes,
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/register",
        element: <Register />,
      },

      // Add more authenticated routes as needed
    ],
  },
];

export default routes;
