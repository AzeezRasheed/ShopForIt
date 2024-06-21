import React, { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { Link, useLocation } from "react-router-dom";
import { Transition } from "@headlessui/react";

const menuItemsData = [
  {
    title: "Shop All",
    url: "/products",
  },
  {
    title: "Shop Extensions",
    url: "/products?category=Extensions",
  },
  // {
  //   title: "Shop Extensions",
  //   subMenu: [
  //     {
  //       title: "Best Sellers",
  //       url: "/products/bestsellers",
  //     },
  //     {
  //       title: "New Release",
  //       url: "/products/newrelease",
  //     },
  //     {
  //       title: "Special Orders",
  //       url: "/products/specialorders",
  //     },
  //   ],
  // },
  {
    title: "Shop Wigs",
    url: "/products?category=Wigs",
  },
  {
    title: "Shop Accessories",
    url: "/products/?category=Accessories",
  },
];

const MenuItem = ({ title, url }) => (
  <Link
    to={url}
    className="border-b flex border-b-[#D9D9D9] hover:text-[#fff] hover:bg-gray-400 bg-[#fff] py-2 px-4 whitespace-nowrap"
  >
    {title}
  </Link>
);

const SubMenu = ({ title, subMenu, onClick, isVisible }) => (
  <div
    className={`relative border-b border-b-[#D9D9D9] flex whitespace-nowrap ${
      isVisible ? "open" : ""
    }`}
  >
    <button
      onClick={onClick}
      className="w-full py-2 px-4 items-center flex whitespace-nowrap hover:text-[#fff] hover:bg-gray-400 bg-[#fff]"
    >
      {title}
      {isVisible ? (
        <MdKeyboardArrowUp size={20} />
      ) : (
        <MdKeyboardArrowDown size={20} />
      )}
    </button>
    <Transition
      show={isVisible}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <ul className="dropdown-content absolute -right-[130px] top-0">
        {subMenu.map((item, index) => (
          <MenuItem key={index} title={item.title} url={item.url} />
        ))}
      </ul>
    </Transition>
  </div>
);

const Dropdown = () => {
  const location = useLocation();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [isExtensionsVisible, setIsExtensionsVisible] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const extensionToggleDropdown = () => {
    setIsExtensionsVisible(!isExtensionsVisible);
  };

  const closeDropdownOnOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(false);
      setIsExtensionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeDropdownOnOutsideClick);

    return () => {
      document.removeEventListener("click", closeDropdownOnOutsideClick);
    };
  }, []);

  useEffect(() => {
    setDropdownVisible(false);
  }, [location]);
  return (
    <div ref={dropdownRef} className="dropdown z-50 inline-block relative">
      <button
        onClick={toggleDropdown}
        className="text-[#5B5959] text-[14px] font-semibold leading-[16px] flex items-center font-OpenSans"
      >
        Shop{" "}
        {isDropdownVisible ? (
          <MdKeyboardArrowUp size={20} />
        ) : (
          <MdKeyboardArrowDown size={20} />
        )}
      </button>
      <Transition
        show={isDropdownVisible}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        <ul className="dropdown-content absolute text-[#000] border mt-4 border-[#D9D9D9] shadow-md font-Montserrat text-[13px] font-[300] capitalize">
          {menuItemsData.map((item, index) =>
            item.subMenu ? (
              <SubMenu
                key={index}
                title={item.title}
                subMenu={item.subMenu}
                onClick={extensionToggleDropdown}
                isVisible={isExtensionsVisible}
              />
            ) : (
              <MenuItem key={index} title={item.title} url={item.url} />
            )
          )}
        </ul>
      </Transition>
    </div>
  );
};

export default Dropdown;
