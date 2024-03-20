import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Stack from "../../components/Stack/Stack";
import ProductsGrid from "../../components/ProductsGrid";
import { useLocation, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../../services/productServices";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import MultiRangeSlider from "../../components/MultiRangeSLider";
import LoadingSpinner from "../../components/LoadingSpinner";
import NoProductFoundMessage from "../../components/NoProductFoundMessage";
import Breadcrumb from "../../components/BreadCrumb";
import HandleSortingOptions from "../../components/HandleSortingOptions";

const Products = () => {
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const location = useLocation();
  const navigate = useNavigate();
  // const products = useGetProducts();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isFilterByPriceOpen, setFilterByPriceOpen] = useState(false);
  const [isProductCategoriesOpen, setProductCategoriesOpen] = useState(false);

  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("category") || null;
  // Fetch products based on location, minPrice, and maxPrice
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1${location.pathname}${
            location.search && location.search
          }`
        );
        category !== null && setSelectedCategory(category);
        setProducts(response.data);
      } catch (error) {
        console.error(error);
        setProducts([]);

        // Handle error, e.g., set an error state
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [location, location.search, selectedCategory, category]);

  // Trigger a re-fetch when minPrice or maxPrice changes
  // useEffect(() => {
  //   const updateQueryParams = () => {
  //     let queryParams = `minPrice=${minPrice}&maxPrice=${maxPrice}`;

  //     if (selectedCategory !== null) {
  //       queryParams += `&category=${selectedCategory}`;
  //     }

  //     const url = `/products/?${queryParams}`;
  //     navigate(url);
  //   };

  //   // Call the function to update query parameters
  //   updateQueryParams();
  // }, [minPrice, maxPrice, navigate]);

  const entriesPerPage = 12;
  const totalEntries = products?.length || 0;
  const startIndex = (currentPage - 1) * entriesPerPage;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);
  const endIndex = Math.min(currentPage * entriesPerPage, totalEntries);
  const currentItems = products?.slice(startIndex, endIndex) || [];

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  const filterProductsByCategory = (category) => {
    setProductCategoriesOpen(false);
    setSelectedCategory(category);
    navigate(`/products?category=${category}`);
  };

  // const resetCategory = () => {
  //   setProductCategoriesOpen(false);
  //   setSelectedCategory(null);
  //   navigate("/products");
  // };

  const handleMinChange = (value) => {
    setMinPrice(value);
  };

  const handleMaxChange = (value) => {
    setMaxPrice(value);
  };

  const handleSubmit = () => {
    let queryParams = `minPrice=${minPrice}&maxPrice=${maxPrice}`;
    if (selectedCategory !== null) {
      queryParams += `&category=${selectedCategory}`;
    }
    const url = `/products/?${queryParams}`;
    navigate(url);
  };

  const handleSortChange = (selectedSortOption) => {
    const [sortBy, sortOrder] = selectedSortOption.split(" : ");
    const sortedProducts = [...products];
    if (sortBy === "price") {
      sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.newPrice);
        const priceB = parseFloat(b.newPrice);
        if (sortOrder === "low to high") {
          return priceA - priceB;
        } else {
          return priceB - priceA;
        }
      });
    }
    setProducts(sortedProducts);
  };
  return (
    <Stack
      direction="column"
      alignItems="center"
      className={"mt-6 px-0 lg:px-12"}
    >
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-[28px] font-[500] leading-[130%] mb-1 uppercase font-OpenSans text-[#000] ">
          {selectedCategory && category !== null
            ? selectedCategory
            : "All Products"}
        </h2>
        <Breadcrumb />
      </div>
      <Stack
        direction="row"
        alignItems="center"
        className={"flex md:items-start gap-6  px-4"}
      >
        {/* Left */}

        <div className="md:flex flex-col mt-7 gap-4 items-center w-full md:w-[300px] lg:w-[300px] hidden ">
          {/* Product Categories */}
          <div className="w-full h-full">
            <div className="toggle-btn flex flex-col items-start gap-3">
              <button
                onClick={() => {
                  setProductCategoriesOpen(!isProductCategoriesOpen);
                }}
                className="flex w-full justify-between items-center gap-2"
              >
                <h2 className="text-[16px] md:text-[12px] lg:text-[16px] font-[600] font-OpenSans">
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
                isDefault={true}
                count={
                  products.filter((product) => product.collections === "Wigs")
                    .length
                }
                onClick={() => filterProductsByCategory("Wigs")}
              />
              <CategoryButton
                label="Extensions"
                isDefault={true}
                count={
                  products.filter(
                    (product) => product.collections === "Extensions"
                  ).length
                }
                onClick={() => filterProductsByCategory("Extensions")}
              />
              <CategoryButton
                label="Accessories"
                isDefault={true}
                count={
                  products.filter(
                    (product) => product.collections === "Accessories"
                  ).length
                }
                onClick={() => filterProductsByCategory("Accessories")}
              />
              {/* <CategoryButton
                isDefault={true}
                label="Show All Products"
                onClick={resetCategory}
              /> */}
            </div>
          </div>

          {/* Filter By Price */}
          <div className="w-full h-full">
            <div className="toggle-btn flex flex-col items-start gap-3">
              <button
                onClick={() => {
                  setFilterByPriceOpen(!isFilterByPriceOpen);
                }}
                className="flex w-full justify-between items-center gap-2"
              >
                <h2 className="text-[16px] md:text-[12px] lg:text-[16px] font-[600] font-OpenSans">
                  FILTER BY PRICE
                </h2>
                <span>
                  {isFilterByPriceOpen ? (
                    <MdKeyboardArrowUp size={23} />
                  ) : (
                    <MdKeyboardArrowDown size={23} />
                  )}
                </span>
              </button>
              <div className="w-full relative rounded-full h-[1px] mb-4 bg-[#D9D9D9]">
                <div
                  className="bg-green-600 h-1.5 absolute -bottom-[2.5px] left-0 rounded-full"
                  style={{ width: isFilterByPriceOpen ? "100%" : "15%" }}
                ></div>
              </div>
            </div>
            <div
              className={`dropdown-content flex flex-col gap-3 items-start overflow-hidden transition-all duration-300 ease-in-out ${
                isFilterByPriceOpen ? "h-auto" : "h-0"
              }`}
            >
              <MultiRangeSlider
                minPrice={minPrice}
                maxPrice={maxPrice}
                onMinChange={handleMinChange}
                onMaxChange={handleMaxChange}
                onSubmit={handleSubmit}
              />
            </div>
          </div>

          {/* Product Type */}
          {/* <div className="w-full h-full">
            <div className="toggle-btn flex flex-col items-start gap-3">
              <button
                onClick={() => {
                  setIsProductTypesOpen(!isProductTypesOpen);
                }}
                className="flex w-full justify-between items-center gap-2"
              >
                <h2 className="text-[16px] md:text-[12px] lg:text-[16px] font-[600] font-OpenSans">
                  PRODUCT TYPE
                </h2>
                <span>
                  {isProductTypesOpen ? (
                    <MdKeyboardArrowUp size={23} />
                  ) : (
                    <MdKeyboardArrowDown size={23} />
                  )}
                </span>
              </button>
              <div className="w-full relative rounded-full h-[1px] mb-4 bg-[#D9D9D9]">
                <div
                  className="bg-green-600 h-1.5 absolute -bottom-[2.5px] left-0 rounded-full"
                  style={{ width: isProductTypesOpen ? "100%" : "15%" }}
                ></div>
              </div>
            </div>
            <div
              className={`dropdown-content flex flex-col gap-3 items-start overflow-hidden transition-all duration-300 ease-in-out ${
                isProductTypesOpen ? "h-auto" : "h-0"
              }`}
            >
              <h3>fff</h3>
            </div>
          </div> */}
        </div>

        {/* Right */}
        <div className="flex flex-col w-full mt-3 lg:w-[900px]   items-center">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="spacebetween"
            className={" border-b-[D9D9D9] border-b-[1px] pb-3"}
          >
            <div className="flex flex-row gap-2 items-center">
              <h2 className="text-[16px] font-[400] font-OpenSans">
                Showing {startIndex + 1} to {endIndex} of {totalEntries} Entries
              </h2>
            </div>
            <HandleSortingOptions onSortChange={handleSortChange} />
          </Stack>

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {Array.isArray(products) && products.length === 0 ? (
                <NoProductFoundMessage />
              ) : (
                <Stack direction="column" alignItems="center">
                  <div className="justify-center items-center flex  w-full h-full pt-6 mb-10">
                    {/* <div className="flex flex-wrap gap-14 items-center  justify-center lg:justify-start lg:items-start w-full"> */}
                    <div className=" grid grid-cols-2  w-full lg:grid-cols-3 md:grid-cols-2 gap-4 items-center  justify-center">
                      {currentItems.map((data, i) => (
                        <ProductsGrid key={i} data={data} />
                      ))}
                    </div>
                  </div>

                  <div>
                    <ReactPaginate
                      previousLabel={"Prev"}
                      nextLabel={"Next"}
                      breakLabel={"..."}
                      breakClassName={"break-me"}
                      pageCount={totalPages}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      onPageChange={handlePageChange}
                      containerClassName={"pagination"}
                      subContainerClassName={"pages pagination"}
                      previousLinkClassName={"paginationLink"}
                      nextLinkClassName={"paginationLink"}
                      disabledClassName={"paginationDisabled"}
                      activeClassName={"active"}
                    />
                  </div>
                </Stack>
              )}
            </>
          )}
        </div>
      </Stack>
    </Stack>
  );
};

export default Products;

const CategoryButton = ({ label, count, isDefault, onClick }) => (
  <button
    onClick={onClick}
    className="py-[2px] items-start text-start w-full text-[14px] text-[#000] font-[500] font-Poppins"
  >
    {`${label} ${!isDefault ? `(${count})` : ""}`}
  </button>
);
