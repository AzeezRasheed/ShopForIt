import React from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import LOGO from "../assets/SHOP FOR IT.png";
import styled from "styled-components";
import tw from "twin.macro";
import FooterLinks from "./FooterLinks";
import { useLocation } from "react-router-dom";
const LOGOWRAPPER = styled.a`
  ${tw`
flex items-center cursor-pointer
`}
`;

const SocialMediaLink = styled.a`
  ${tw`
 hover:text-slate-200 
`}
`;
function Footer() {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <footer
      className="p-10 sm:px-2 sm:pt-14  "
      style={{
        backgroundColor: pathname === "/" ? "#041706" : "#FFFFFF",
      }}
    >
      <div className="flex flex-col gap-6 items-center justify-center m-auto">
        <div className="flex  md:flex-col-reverse items-center m-auto justify-center lg:justify-between md:items-start  gap-8 lg:gap-10 md:p-8 lg:flex-row  flex-col   ">
          <div className="flex flex-col gap-5 items-start w-full max-w-[248px] ">
            <LOGOWRAPPER href="/">
              <img
                src={LOGO}
                alt="shop for it"
                className="w-[36px] h-[36px] "
              />
              <span className="font-Montserrat font-medium text-2xl text-white cursor-pointer">
                shop for it
              </span>
            </LOGOWRAPPER>

            <h2
              className={`font-bold text-[16px] leading-[20px] text-[${
                pathname === "/" ? "#FFFFFF" : "#222222"
              }] font-Montserrat`}
            >
              51 Joy’s close, Ago Palace Way Okota, Lagos.
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
            <SocialMediaLink
              href="/"
              style={{
                color: pathname === "/" ? "#FFFFFF" : "#C0C0C0",
              }}
            >
              <BsTwitter />
              <span className="sr-only">Twitter page</span>
            </SocialMediaLink>

            <SocialMediaLink
              href="/"
              style={{
                color: pathname === "/" ? "#FFFFFF" : "#C0C0C0",
              }}
            >
              <BsInstagram />
              <span className="sr-only">Instagram page</span>
            </SocialMediaLink>
            <SocialMediaLink
              href="/"
              style={{
                color: pathname === "/" ? "#FFFFFF" : "#C0C0C0",
              }}
            >
              <BsFacebook />
              <span className="sr-only">Facebook page</span>
            </SocialMediaLink>
            <SocialMediaLink
              href="/"
              style={{
                color: pathname === "/" ? "#FFFFFF" : "#C0C0C0",
              }}
            >
              <BsYoutube />
              <span className="sr-only">Youtube account</span>
            </SocialMediaLink>
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
