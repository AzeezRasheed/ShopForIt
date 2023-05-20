import AuthLayout from "../layouts/AuthLayout";
import BackgroundLayout from "../layouts/BackgroundLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import productsRoute from "./productsRoutes";
import checkoutRoutes from "./checkoutRoutes";

let routes = [
  {
    element: <BackgroundLayout />,
    children: [
      {
        path: "/",
        index: true,
        element: <Home />,
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
