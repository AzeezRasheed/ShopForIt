import Checkout from "../pages/Checkout/Checkout";

const checkoutRoutes = {
  path: "checkout",
  children: [
    {
      index: true,
      element: <Checkout />,
    },
  ],
};

export default checkoutRoutes;
