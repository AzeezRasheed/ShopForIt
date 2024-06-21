import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import Button from "./Button/Button";
import { Drawer } from "@mui/material";
import DrawerRight from "./DrawerRight";
import Dropdown from "./NavbarDropdown";
import { useDispatch } from "react-redux";
import LogoBlack from "../assets/LogoBlack.png";
import { RiDashboardLine } from "react-icons/ri";
import { FiUser, FiLogIn } from "react-icons/fi";
import CollapsibleInput from "./CollapsibleInput";
import { useGetCart } from "../redux/cart/cartSlice";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { useGetProducts } from "../redux/product/productSlice";
import { FILTER_PRODUCTS } from "../redux/product/filterSlice";
import { Link, useNavigate } from "react-router-dom";
import { useIsUserLoggedIn, useUserData } from "../redux/auth/authSlice";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { FaHamburger } from "react-icons/fa";
import { useMediaQuery } from "react-responsive";
import NavbarIsMobile from "./NavbarIsMobile";

const styles = {
  container: tw`flex flex-col w-full z-50`,
  navbarUp: tw`px-4 md:px-14 py-6  w-full items-center`,
  navbarDown: tw`px-4 lg:px-14 py-6 w-full items-center`,
  innerWrapper: tw`w-full flex items-center justify-between`,
  logoWrapper: tw`flex items-center cursor-pointer`,
  logoImage: tw`w-[36px] h-[36px]`,
  socialMediaWrapper: tw`flex gap-6 justify-center`,
  socialMediaAction: tw`text-[#C0C0C0] cursor-pointer`,
  icons: tw`flex items-center justify-center px-2 z-50 `,
  iconButton: tw`mr-5 items-center relative  z-50 h-full py-2`,
  list: tw`text-[14px] font-semibold  leading-[16px] flex items-center font-OpenSans`,
  navigationLinks: tw`flex items-center justify-between gap-[60px] m-auto`,
};

function Navbar() {
  const cart = useGetCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useUserData();
  const products = useGetProducts();
  // const pathname = location.pathname;
  const isLoggedIn = useIsUserLoggedIn();
  const [search, setSearch] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: "425px" });
  const isTablet = useMediaQuery({ maxWidth: "768px" });
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const cartTotal = cart?.length;
  const isAdmin = userData?.isAdmin;

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
    <div style={styles.container}>
      <div
        style={{
          ...styles.navbarUp,
          backgroundColor: "#FFFFFF",
          border: "none",
        }}
      >
        <div style={styles.innerWrapper}>
          {!isMobile && !isTablet && (
            <div style={styles.socialMediaWrapper}>
              <a style={styles.socialMediaAction} href="/">
                <BsInstagram size={20} />
                <span className="sr-only">Instagram page</span>
              </a>
              <a style={styles.socialMediaAction} href="/">
                <BsTwitter size={20} />
                <span className="sr-only">Twitter page</span>
              </a>
              <a style={styles.socialMediaAction} href="/">
                <BsFacebook size={20} />
                <span className="sr-only">Facebook page</span>
              </a>
              <a style={styles.socialMediaAction} href="/">
                <BsYoutube size={20} />
                <span className="sr-only">Youtube account</span>
              </a>
            </div>
          )}
          <Link style={styles.logoWrapper} to="/">
            <img
              src={LogoBlack}
              alt="shop for it"
              className="w-[50px] h-[48px] "
            />
            <span
              className={`font-Montserrat font-medium text-2xl text-[${"#000000"}] cursor-pointer`}
            >
              shop for it
            </span>
          </Link>

          <div style={styles.icons}>
            {/* <Button ripple={true} onClick={() => setIsDrawerOpen(true)}>
              <div style={{ ...styles.iconButton, color: "#000000" }}>
                <AiOutlineHeart size={22} />
              </div>
            </Button> */}

            {!isMobile && (
              <CollapsibleInput placeholder="Search for products, categories..." />
            )}
            <Button
              ripple={true}
              onClick={handleDrawerOpen}
              style={{ position: "relative" }}
            >
              <div style={{ ...styles.iconButton, color: "#000000" }}>
                <span>
                  <HiOutlineShoppingCart size={22} />
                </span>
                <div className="absolute w-full justify-center flex m-auto z-50 -top-1  text-[#079627] font-normal text-[13px] items-center uppercase ">
                  <span className="z-50 text-center">{cartTotal}</span>
                </div>
              </div>
            </Button>

            {isLoggedIn ? (
              <Button ripple={true} onClick={() => {}}>
                <div style={{ ...styles.iconButton, color: "#000000" }}>
                  <FiUser size={22} />
                </div>
              </Button>
            ) : (
              <Button ripple={true} onClick={() => navigate("/auth/login")}>
                <div style={{ ...styles.iconButton, color: "#000000" }}>
                  <FiLogIn size={22} />
                </div>
              </Button>
            )}

            {isLoggedIn && isAdmin && (
              <Button
                ripple={true}
                onClick={() => navigate("/admin/dashboard")}
              >
                <div style={{ ...styles.iconButton, color: "#000000" }}>
                  <RiDashboardLine size={22} />
                </div>
              </Button>
            )}

            {isMobile && (
              <Button
                ripple={true}
                onClick={() => {
                  setHamburgerOpen(true);
                }}
                style={{ position: "relative" }}
              >
                <div style={{ ...styles.iconButton }}>
                  <FaHamburger size={22} />
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>

      {!isMobile && (
        <div
          style={{
            ...styles.navbarDown,
            backgroundColor: "#FFFFFF",
            border: "none",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <div style={styles.innerWrapper}>
            <ul style={styles.navigationLinks}>
              <li style={{ ...styles.list, color: "#5B5959" }}>
                <Link to="/">Home</Link>
              </li>
              <Dropdown />
              <li style={{ ...styles.list, color: "#5B5959" }}>
                <Link to="/">About Us</Link>
              </li>
              <li style={{ ...styles.list, color: "#5B5959" }}>
                <Link to="/contact-us">Contact Us</Link>
              </li>
            </ul>
            {/* {pathname !== "/" && (
        <Button onClick={goBack} ripple={true}>
          <Stack direction="row" className="gap-1">
            <AiOutlineLeft size={10} />
            <Typography as={"h3"} variant="black" size="bodySmall">
              Previous Page
            </Typography>
          </Stack>
        </Button>
      )} */}
          </div>
        </div>
      )}

      {isMobile && (
        <NavbarIsMobile
          hamburgerOpen={hamburgerOpen}
          setHamburgerOpen={setHamburgerOpen}
        />
      )}
      <Drawer anchor="right" open={isDrawerOpen} onClose={handleDrawerClose}>
        <DrawerRight />
      </Drawer>
    </div>
  );
}

export default Navbar;
