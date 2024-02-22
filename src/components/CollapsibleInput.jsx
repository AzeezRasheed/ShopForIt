import React, { useState, useEffect, useRef } from "react";
import {
  FILTER_PRODUCTS,
  useSelectFilteredProducts,
} from "../redux/product/filterSlice";
import { useDispatch } from "react-redux";
import { useGetProducts } from "../redux/product/productSlice";
import { useNavigate } from "react-router-dom";
import { Transition } from "@headlessui/react";

const CollapsibleInput = ({ placeholder }) => {
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useGetProducts();
  const [search, setSearch] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleInputChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      // Clicked outside the input, so close it
      setIsExpanded(false);
    }
  };

  useEffect(() => {
    // Attach event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    // Cleanup the event listener when component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredProducts = useSelectFilteredProducts();
  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, dispatch, search]);

  return (
    <div
      ref={inputRef}
      className="relative md:mr-5 items-center flex z-50 h-full py-2"
    >
      <input
        type="text"
        className={`transition-all duration-300 rounded-full ${
          isExpanded
            ? "w-[300px] border focus:border-[#031E0C] focus:ring-[#031E0C] focus:outline-none focus:ring focus:ring-opacity-4 "
            : "w-0"
        } px-4 py-2`}
        placeholder={placeholder}
        value={search}
        onChange={handleInputChange}
      />
      <button
        className="absolute right-2"
        onClick={() => {
          toggleExpansion();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-5 h-5 ${isExpanded ? "text-[#031E0C]" : "text-black"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </button>

      {/* {search && filteredProducts.length > 0 && (
        <div
          className={`absolute top-12 z-50 h-full ${
            !isExpanded && "h-0"
          } left-0 w-full bg-white shadow-lg text-left`}
        >
          <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {filteredProducts.map((product) => {
                const formattedCategories = product?.categories?.map(
                  (categories) => `${categories} Inches  `
                );
                return (
                  <div key={product?._id}>
                    <button
                      onClick={() => {
                        navigate(`/products/info/${product?._id}`);
                        setSearch("");
                      }}
                      className={`
                                  hover:bg-gray-100 hover:text-gray-900 "text-gray-700" flex items-start text-start justify-start flex-row w-full px-4 py-2 text-sm`}
                    >
                      {product?.title} {} {} {formattedCategories} {}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

    
        </div>
      )} */}
      {search && filteredProducts.length > 0 && (
        <div
          className={`absolute top-12 z-50  ${
            !isExpanded && "hidden"
          } left-0 w-full bg-white shadow-lg text-left`}
        >
          <Transition
            show={isExpanded}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                {filteredProducts.map((product) => {
                  const formattedCategories = product?.categories?.map(
                    (categories) => `${categories} Inches  `
                  );
                  return (
                    <div key={product?._id}>
                      <button
                        onClick={() => {
                          navigate(`/products/info/${product?._id}`);
                          setSearch("");
                        }}
                        className={`hover:bg-gray-100 hover:text-gray-900 "text-gray-700" flex items-start text-start justify-start flex-row w-full px-4 py-2 text-sm`}
                      >
                        {product?.title} {} {} {formattedCategories} {}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </Transition>
        </div>
      )}
    </div>
  );
};

export default CollapsibleInput;
