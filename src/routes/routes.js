import AuthLayout from "../layouts/AuthLayout";
import BackgroundLayout from "../layouts/BackgroundLayout";
import Home from "../pages/Home";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import productsRoute from "./productsRoutes";
import checkoutRoutes from "./checkoutRoutes";
import AdminDashboardLayout from "../layouts/AdminDashboardLayout";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import ProductDetail from "../pages/admin/productDetail/productDetail";
import EditProduct from "../pages/admin/editProduct/EditProduct";
import Profile from "../pages/admin/profile/Profile";
import EditProfile from "../pages/admin/editProfile/EditProfile";
import AddProduct from "../pages/admin/addProduct/AddProduct";
import ContactUs from "../pages/Contact/ContactUs";
import Success from "../pages/SuccessPayent/Success";

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
  {
    element: <AdminDashboardLayout />,
    children: [
      {
        path: "/admin/dashboard",
        index: true,
        element: <AdminDashboard />,
      },
      {
        path: "/admin/dashboard/product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "/admin/dashboard/edit-product/:id",
        element: <EditProduct />,
      },
      {
        path: "/admin/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/admin/dashboard/edit-profile",
        element: <EditProfile />,
      },
      {
        path: "/admin/dashboard/add-product",
        element: <AddProduct />,
      },

      // Add more authenticated routes as needed
    ],
  },
];

export default routes;
