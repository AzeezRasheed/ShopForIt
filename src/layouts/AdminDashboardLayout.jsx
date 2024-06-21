import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { SET_INPUT_BOOLEAN } from "../redux/inputBoolean/inputBooleanSlice";
import SidenavHeader from "../components/Admin/Sidebar/SidenavHeader";
import SidenavMenu from "../components/Admin/Sidebar/SideNavMenu";
import { sidebarmenu } from "../data/sidebar";
import LogoWhite from "../assets/SHOP FOR IT.png";
import { useUserData } from "../redux/auth/authSlice";

const AdminDashboardLayout = () => {
  // const location = useLocation();
  // const pathname = location.pathname;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputBoolean, setInputBoolean] = useState(false);
  const userData = useUserData();
  const isAdmin = userData?.isAdmin;

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin, navigate, dispatch]);

  useEffect(() => {
    dispatch(SET_INPUT_BOOLEAN(inputBoolean));
  }, [inputBoolean, dispatch]);
  return (
    <div className="relative min-h-screen md:flex " data-dev-hint="container">
      <input
        type="checkbox"
        id="menu-open"
        className="hidden"
        onClick={() => {
          setInputBoolean(!inputBoolean);
        }}
      />
      <label
        htmlFor="menu-open"
        className="absolute right-2 bottom-2 shadow-lg rounded-full p-2 bg-gray-100 text-gray-600 md:hidden"
        data-dev-hint="floating action button"
      >
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </label>

      <SidenavHeader />
      <aside
        id="sidebar"
        className="bg-gray-800 text-gray-100 md:w-64 w-3/4 space-y-6 pt-6 px-0 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out  md:flex md:flex-col md:justify-between overflow-y-auto"
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex flex-col p-2 space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <div className="flex items-center cursor-pointer">
            <img
              src={LogoWhite}
              alt="shop for it"
              className="w-[36px] h-[36px] "
            />
            <span
              className={`font-Montserrat font-medium text-2xl text-[${"#FFFFFF"}] cursor-pointer`}
            >
              shop for it
            </span>
          </div>

          {sidebarmenu.map((item, index) => {
            return <SidenavMenu key={index} item={item} />;
          })}
        </div>
      </aside>

      <main id="content" className="flex-1  pl-2 pr-2">
        <div className="max-w-7xl mx-auto">
          <div className="py-6 sm:px-0">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardLayout;
