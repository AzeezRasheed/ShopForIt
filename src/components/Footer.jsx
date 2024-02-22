import React from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import Logo_White from "../assets/SHOP FOR IT.png";
import Logo_Black from "../assets/SHOP FOR IT BLACK.png";
import tw from "twin.macro";
import FooterLinks from "./FooterLinks";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <footer
      style={{
        backgroundColor: pathname === "/" ? "#041706" : "#FFFFFF",
        ...styles.container,
      }}
    >
      <div className="flex flex-col gap-6 items-center justify-center m-auto">
        <div className="flex w-full  md:flex-col-reverse items-start m-auto justify-center lg:justify-between md:items-start  gap-8 lg:gap-20 md:p-8 lg:flex-row  flex-col   ">
          <div className="flex flex-col gap-5 items-start w-full max-w-[248px] ">
            <Link style={styles.logoLink} to="/">
              <img
                src={pathname === "/" ? Logo_White : Logo_Black}
                alt="shop for it"
                className="w-[50px] h-[48px] "
              />
              <span
                className={`font-Montserrat font-medium text-2xl text-[${
                  pathname === "/" ? "#FFFFFF" : "#222222"
                }] cursor-pointer`}
              >
                shop for it
              </span>
            </Link>

            <h2
              className={`font-bold text-[16px] leading-[20px] text-[${
                pathname === "/" ? "#FFFFFF" : "#222222"
              }] font-Montserrat`}
            >
              Gods own plaza No 4 ibeh road okota isolo Lagos
            </h2>
            <div className="flex flex-col items-start">
              <h3
                className={`font-semibold  text-[16px] leading-[20px] text-[${
                  pathname === "/" ? "#FFFFFF" : "#222222"
                }] font-Montserrat mb-1`}
              >
                Call Us: +234 817 973 2392
              </h3>
              <h3
                className={`font-bold  text-[16px] leading-[20px] text-[${
                  pathname === "/" ? "#FFFFFF" : "#222222"
                }] font-Montserrat`}
              >
                Email:
                <span
                  className={` font-semibold ml-1 ${
                    pathname === "/" ? "text-gray-300" : "text-[#222222]"
                  }]`}
                >
                  contact@shopforit.com
                </span>
              </h3>
            </div>
          </div>

          <FooterLinks />
        </div>

        <div className="flex flex-wrap  text-start justify-between w-full items-start md:items-center md:text-center pl-6 ">
          <div className="flex space-x-6 sm:justify-center mb-4 md:mb-0">
            <a
              href="/"
              style={{
                color: pathname === "/" ? "#FFFFFF" : "#C0C0C0",
                ...styles.socialMediaLink,
              }}
            >
              <BsTwitter />
              <span className="sr-only">Twitter page</span>
            </a>

            <a
              href="/"
              style={{
                color: pathname === "/" ? "#FFFFFF" : "#C0C0C0",
                ...styles.socialMediaLink,
              }}
            >
              <BsInstagram />
              <span className="sr-only">Instagram page</span>
            </a>
            <a
              href="/"
              style={{
                color: pathname === "/" ? "#FFFFFF" : "#C0C0C0",
                ...styles.socialMediaLink,
              }}
            >
              <BsFacebook />
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="/"
              style={{
                color: pathname === "/" ? "#FFFFFF" : "#C0C0C0",
                ...styles.socialMediaLink,
              }}
            >
              <BsYoutube />
              <span className="sr-only">Youtube account</span>
            </a>
          </div>
          <span
            className=" text-[20px] leading-[20px]font-normal font-Montserrat "
            style={{
              color: pathname === "/" ? "#FFFFFF" : "#222222",
            }}
          >
            &copy;{new Date().getFullYear()} Shop for it. All Rights Reserved.
          </span>
          <div className="hidden lg:block"></div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

const styles = {
  logoLink: tw`flex items-center cursor-pointer`,
  socialMediaLink: tw` hover:text-slate-200 `,
  container: tw`p-10 sm:px-2 sm:pt-14  `,
};
