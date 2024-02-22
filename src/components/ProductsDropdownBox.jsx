import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { useGetProducts } from "../redux/product/productSlice";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const CategoryButton = ({ label, count, onClick }) => (
  <button
    onClick={onClick}
    className="py-[2px] items-start text-start w-full text-[14px] text-[#000] font-[500] font-Poppins"
  >
    {`${label} (${count})`}
  </button>
);

const ProductsDropdownBox = () => {
  const [isProductCategoriesOpen, setProductCategoriesOpen] = useState(false);
  const [isFilterByPriceOpen, setFilterByPriceOpen] = useState(false);
  const [isProductTypesOpen, setIsProductTypesOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1${location.pathname}${location.search && location.search}`);
        setProducts(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  }, [location]);

  console.log(products)
  const filterProductsByCategory = (category) => {
    setProductCategoriesOpen(false);
    setSelectedCategory(category);
    navigate(`/products?category=${category}`);
  };

  const resetCategory = () => {
    setProductCategoriesOpen(false);
    setSelectedCategory(null);
    navigate("/products");
  };

  return (
    <div className="flex flex-col gap-4 items-center w-[30%]">
      <div className="w-full h-full">
        <div className="toggle-btn flex flex-col items-start gap-3">
          <button
            onClick={() => {
              setProductCategoriesOpen(!isProductCategoriesOpen);
            }}
            className="flex w-full justify-between items-center gap-2"
          >
            <h2 className="text-[16px] font-[600] font-OpenSans">
              PRODUCT CATEGORIES
            </h2>
            <span>
              {isProductCategoriesOpen ? (
                <MdKeyboardArrowUp size={23} />
              ) : (
                <MdKeyboardArrowDown size={23} />
              )}
            </span>
          </button>
          <div className="w-full relative rounded-full h-[1px] mb-4 bg-[#D9D9D9]">
            <div
              className="bg-green-600 h-1.5 absolute -bottom-[2.5px] left-0 rounded-full"
              style={{ width: isProductCategoriesOpen ? "100%" : "15%" }}
            ></div>
          </div>
        </div>
        <div
          className={`dropdown-content flex flex-col gap-3 items-start overflow-hidden transition-all duration-300 ease-in-out ${
            isProductCategoriesOpen ? "h-auto" : "h-0"
          }`}
        >
          <CategoryButton
            label="Wigs"
            count={
              products.filter((product) => product.collections === "Wigs")
                .length
            }
            onClick={() => filterProductsByCategory("Wigs")}
          />
          <CategoryButton
            label="Extensions"
            count={
              products.filter((product) => product.collections === "Extensions")
                .length
            }
            onClick={() => filterProductsByCategory("Extensions")}
          />
          <CategoryButton
            label="Accessories"
            count={
              products.filter(
                (product) => product.collections === "Accessories"
              ).length
            }
            onClick={() => filterProductsByCategory("Accessories")}
          />
          <CategoryButton label="Show All Products" onClick={resetCategory} />
        </div>
      </div>

      {/* ... (similar structure for other sections) ... */}
    </div>
  );
};

export default ProductsDropdownBox;
