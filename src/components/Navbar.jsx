import React, { Fragment, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import LOGO from "../assets/SHOP FOR IT.png";
import { Menu, Transition } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { AiOutlineHeart } from "react-icons/ai";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
const CONTAINER = styled.div`
  ${tw`
  flex flex-col w-full
`}
`;

const NAVBARUP = styled.div`
  ${tw`
  px-4 md:px-14 py-6 bg-[#041706] w-full items-center border border-solid border-[#152917]
`}
`;

const NAVBARDOWN = styled.div`
  ${tw`
  px-4 lg:px-14 py-6 bg-[#041706] w-full items-center border border-solid border-[#152917] justify-center
`}
`;

const INNERWRAPPER = styled.div`
  ${tw`
 w-full flex items-center justify-between  lg:justify-center 
`}
`;

const LOGOWRAPPER = styled.a`
  ${tw`
 flex items-center cursor-pointer
`}
`;

const SEARCHCOMPONENT = styled.div`
  ${tw`
 flex items-center bg-[#424242] rounded-[6px]   
`}
`;

const ICONS = styled.div`
  ${tw`
flex items-center justify-center px-2
`}
`;

const ICONBUTTON = styled.button`
  ${tw`
mr-5 items-center text-white
`}
`;

const LIST = styled.li`
  ${tw`
text-[13px] font-semibold leading-[16px] text-white flex items-center text-white font-Montserrat
`}
`;
function Navbar() {
  const [eventLocation, setEventLocation] = useState("");
  const [nextEvent, setNextEvent] = useState("");
  return (
    <>
      <CONTAINER>
        <NAVBARUP>
          <INNERWRAPPER>
            <div className="lg:w-1/5 w-full">
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
            </div>
            <div className="w-3/5 hidden lg:block ">
              <SEARCHCOMPONENT>
                <div className="items-center flex justify-center">
                  <div className="border-r border-solid border-r-[#535353] h-full items-center flex ">
                    <div className="px-10  py-3 w-full items-center">
                      <Menu as="div" className="relative  text-left">
                        <div>
                          <Menu.Button className="  flex  items-center text-center text-white text-[12px] leading-[15px] w-[110px]  font-normal font-Montserrat  ">
                            All categories
                            <BiChevronDown
                              size={25}
                              className="ml-2 -mr-1 h-5 w-5 text-white hover:text-violet-100"
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
                          <Menu.Items className="absolute -left-10 top-8 mt-2 w-52 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                    className={` relative items-center m-auto  w-full  max-w-[540px]  h-full  `}
                  >
                    <input
                      type="text "
                      placeholder="Search for products..."
                      onChange={(e) => setNextEvent(e.target.value)}
                      className={` relative peer placeholder:text-white placeholder:font-Montserrat placeholder:text-xs  z-10 bg-transparent outline-none  focus:cursor-text pl-10 `}
                    />

                    <FiSearch className="absolute top-0 bottom-0 inset-y-0 h-8 w-12 my-auto px-3.5 pt-0 items-center text-white  " />
                  </div>
                </div>
              </SEARCHCOMPONENT>
            </div>
            <div className="w-1/5">
              <ICONS>
                <ICONBUTTON>
                  <AiOutlineHeart size={22} />
                </ICONBUTTON>
                <ICONBUTTON>
                  <HiOutlineShoppingCart size={22} />
                </ICONBUTTON>
                <ICONBUTTON>
                  <FiUser size={22} />
                </ICONBUTTON>
              </ICONS>
            </div>
          </INNERWRAPPER>
        </NAVBARUP>

        <NAVBARDOWN>
          <INNERWRAPPER>
            <ul className="flex items-center justify-between gap-5 list-none m-auto ">
              <LIST>
                <a href="/">Home</a>
              </LIST>
              <LIST>
                <a href="/">Wigs</a>
              </LIST>
              <LIST>
                <a href="/">Extensions</a>
              </LIST>
              <LIST>
                <a href="/">Become a Vendor</a>
              </LIST>
            </ul>
          </INNERWRAPPER>
        </NAVBARDOWN>
      </CONTAINER>
    </>
  );
}

export default Navbar;
