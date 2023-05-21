import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import LogoWhite from "../assets/SHOP FOR IT.png";
import LogoBlack from "../assets/LogoBlack.png";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHeart, AiOutlineLeft } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button/Button";
import Typography from "./Typography/Typography";
import Stack from "./Stack/Stack";
import { Drawer } from "@mui/material";
import DrawerRight from "./DrawerRight";
import { useIsUserLoggedIn } from "../redux/auth/authSlice";
import { useGetProducts } from "../redux/product/productSlice";
import {
  FILTER_PRODUCTS,
  useSelectFilteredProducts,
} from "../redux/product/filterSlice";
import { useDispatch } from "react-redux";
import { useGetCart } from "../redux/cart/cartSlice";
const CONTAINER = styled.div`
  ${tw`
  flex flex-col w-full
`}
`;

const NAVBARUP = styled.div`
  ${tw`
  px-4 md:px-14 py-6  w-full items-center 
`}
`;

const NAVBARDOWN = styled.div`
  ${tw`
  px-4 lg:px-14 py-6 w-full items-center   
`}
`;

const INNERWRAPPER = styled.div`
  ${tw`
 w-full flex items-center justify-between  lg:justify-center 
`}
`;

const LOGOWRAPPER = styled.div`
  ${tw`
 flex items-center cursor-pointer
`}
`;

const SEARCHCOMPONENT = styled.div`
  ${tw`
 flex items-center rounded-[6px] w-full
`}
`;

const ICONS = styled.div`
  ${tw`
flex items-center justify-center px-2 z-50 
`}
`;

const ICONBUTTON = styled.div`
  ${tw`
mr-5 items-center relative  z-50 h-full py-2
`}
`;

const LIST = styled.li`
  ${tw`
text-[13px] font-semibold leading-[16px] flex items-center font-Montserrat
`}
`;
function Navbar() {
  const [search, setSearch] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [nextEvent, setNextEvent] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;
  const isLoggedIn = useIsUserLoggedIn();
  const dispatch = useDispatch();
  const products = useGetProducts();
  const filteredProducts = useSelectFilteredProducts();
  const cart = useGetCart();
  const cartTotal = cart.length;
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, search }));
  }, [products, dispatch, search]);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      <CONTAINER>
        <NAVBARUP
          style={{
            backgroundColor: pathname === "/" ? "#041706" : "#FFFFFF",
            border:
              pathname === "/" ? "1px solid #152917" : "0.5px solid #CFCFCF",
          }}
        >
          <INNERWRAPPER>
            <div className="lg:w-1/5 w-full">
              <Link to="/">
                <LOGOWRAPPER>
                  <img
                    src={pathname === "/" ? LogoWhite : LogoBlack}
                    alt="shop for it"
                    className="w-[36px] h-[36px] "
                  />
                  <span
                    className={`font-Montserrat font-medium text-2xl text-[${
                      pathname === "/" ? "#FFFFFF" : "#000000"
                    }] cursor-pointer`}
                  >
                    shop for it
                  </span>
                </LOGOWRAPPER>
              </Link>
            </div>
            <div className={`w-3/5 hidden lg:block `}>
              <SEARCHCOMPONENT
                style={{
                  backgroundColor: pathname === "/" ? "#424242" : "#FFFFFF",
                  border: pathname === "/" ? "none" : "0.5px solid #CFCFCF",
                }}
              >
                <div className={`items-center flex justify-center w-full  `}>
                  <div className={`" h-full items-center flex "`}>
                    <div
                      className={`px-10  py-3 w-full items-center border-r border-solid border-r-[${
                        location.pathname === "/" ? "#535353" : "#000000"
                      }] `}
                    >
                      <Menu as="div" className="relative  text-left">
                        <div>
                          <Menu.Button
                            className={`flex  items-center text-center text-[${
                              pathname === "/" ? "#FFFFFF" : "#000000"
                            }] text-[12px] leading-[15px] w-[110px]  font-normal font-Montserrat`}
                          >
                            All categories
                            <BiChevronDown
                              size={25}
                              className={`ml-2 -mr-1 h-5 w-5 text-${
                                pathname === "/" ? "#FFFFFF" : "#000000"
                              } hover:${
                                pathname === "/"
                                  ? "text-violet-100"
                                  : "text-zinc-700"
                              }`}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute z-50 -left-10 top-8 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="px-1 py-1 ">
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => setEventLocation("london")}
                                    className={
                                      active
                                        ? "bg-gray-100 text-gray-900 flex items-center flex-row  w-full  px-4 py-2 text-sm"
                                        : "text-gray-700 flex flex-row  items-center px-4 py-2  w-full text-sm"
                                    }
                                  >
                                    Wigs
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() => setEventLocation("lagos")}
                                    className={
                                      active
                                        ? "bg-gray-100 text-gray-900 flex items-center flex-row  px-4 py-2 w-full text-sm"
                                        : "text-gray-700 flex flex-row  items-center px-4 py-2 w-full text-sm"
                                    }
                                  >
                                    Extensions
                                  </button>
                                )}
                              </Menu.Item>
                              <Menu.Item>
                                {({ active }) => (
                                  <button
                                    onClick={() =>
                                      setEventLocation("los-angeles")
                                    }
                                    className={
                                      active
                                        ? "bg-gray-100 text-gray-900 flex items-center flex-row  w-full  px-4 py-2 text-sm"
                                        : "text-gray-700 flex flex-row  items-center  w-full px-4 py-2 text-sm"
                                    }
                                  >
                                    Accessories
                                  </button>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>

                  <div
                    className={` relative items-center m-auto  w-full h-full `}
                  >
                    <input
                      type="text "
                      placeholder="Search for products..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className={` relative peer placeholder:text-[${
                        pathname === "/" ? "#FFFFFF" : "#787878"
                      }] text-[${
                        pathname === "/" ? "#FFFFFF" : "#787878"
                      }]  placeholder:font-Montserrat placeholder:text-xs  z-10 bg-transparent outline-none  focus:cursor-text pl-10 w-full `}
                    />

                    <FiSearch
                      className={`absolute top-0 bottom-0 inset-y-0 h-8 w-12 my-auto px-3.5 pt-0 items-center text-[${
                        location.pathname === "/" ? "#FFFFFF" : "#000000"
                      }]`}
                    />
                    {/* Conditionally render the dropdown */}
                    {search && filteredProducts.length > 0 && (
                      <div className="absolute top-8 z-50 left-0 w-full bg-white shadow-lg text-left">
                        <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {filteredProducts.map((product) => {
                              const formattedCategories =
                                product?.categories?.map(
                                  (categories) => `${categories} Inches  `
                                );
                              return (
                                <div key={product?._id}>
                                  <button
                                    onClick={() => {
                                      navigate(
                                        `/products/info/${product?._id}`
                                      );
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
                    )}
                  </div>
                </div>
              </SEARCHCOMPONENT>
            </div>
            <div className="w-1/5 z-50 ">
              <ICONS>
                <Button
                  ripple={true}
                  onClick={() => {
                    setIsDrawerOpen(true);
                  }}
                >
                  <ICONBUTTON
                    style={{
                      color: pathname === "/" ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <AiOutlineHeart size={22} />
                  </ICONBUTTON>
                </Button>
                <Button
                  ripple={true}
                  onClick={handleDrawerOpen}
                  style={{
                    position: "relative",
                  }}
                >
                  <ICONBUTTON
                    style={{
                      color: pathname === "/" ? "#FFFFFF" : "#000000",
                    }}
                  >
                    <span>
                      <HiOutlineShoppingCart size={22} />
                    </span>
                    <div className="absolute w-full justify-center flex m-auto z-50 -top-1  text-[#079627] font-normal text-[13px] items-center uppercase ">
                      <span className="z-50 text-center">{cartTotal}</span>
                    </div>
                  </ICONBUTTON>
                </Button>
                {isLoggedIn && (
                  <Button ripple={true} onClick={() => {}}>
                    <ICONBUTTON
                      style={{
                        color: pathname === "/" ? "#FFFFFF" : "#000000",
                      }}
                    >
                      <FiUser size={22} />
                    </ICONBUTTON>
                  </Button>
                )}
              </ICONS>
            </div>
          </INNERWRAPPER>
        </NAVBARUP>

        <NAVBARDOWN
          style={{
            backgroundColor: pathname === "/" ? "#041706" : "#F3F3F3",
            border: pathname === "/" ? "1px solid #152917" : "none",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {pathname === "/" ? (
            <INNERWRAPPER>
              <ul className="flex items-center justify-between gap-5 color-none m-auto ">
                <LIST
                  style={{
                    color: pathname === "/" ? "#FFFFFF" : "#000000",
                  }}
                >
                  <a href="/">Home</a>
                </LIST>
                <LIST
                  style={{
                    color: pathname === "/" ? "#FFFFFF" : "#000000",
                  }}
                >
                  <Link to="/products">Products</Link>
                </LIST>
                <LIST
                  style={{
                    color: pathname === "/" ? "#FFFFFF" : "#000000",
                  }}
                >
                  <a href="/">Support</a>
                </LIST>
                <LIST
                  style={{
                    color: pathname === "/" ? "#FFFFFF" : "#000000",
                  }}
                >
                  <a href="/">Become a Vendor</a>
                </LIST>
              </ul>
            </INNERWRAPPER>
          ) : (
            <Stack justifyContent="spacebetween" direction="row">
              <Button
                onClick={() => {
                  navigate("/");
                }}
                ripple={true}
              >
                <Typography as={"h3"} variant="black" size="bodySmall">
                  Home
                </Typography>
              </Button>
              <Button
                onClick={() => {
                  goBack();
                }}
                ripple={true}
              >
                <Stack direction="row" className="gap-1">
                  <AiOutlineLeft size={10} />
                  <Typography as={"h3"} variant="black" size="bodySmall">
                    Previous Page
                  </Typography>
                </Stack>
              </Button>
            </Stack>
          )}
        </NAVBARDOWN>

        <Fragment>
          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={handleDrawerClose}
          >
            <DrawerRight />
          </Drawer>
        </Fragment>
      </CONTAINER>
    </>
  );
}

export default Navbar;
