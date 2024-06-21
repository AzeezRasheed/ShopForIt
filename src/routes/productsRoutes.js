import Products from "../pages/Products/Products";
import ProductInfo from "../pages/Products/ProductInfo/ProductInfo";

const ProductsRoute = {
  path: "products",
  children: [
    {
      index: true,
      element: <Products />,
    },
    {
      path: "info/:id",
      element: <ProductInfo />,
    },
  ],
};

export default ProductsRoute;
