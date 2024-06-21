import { FaTh, FaRegChartBar } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

export const sidebarmenu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/admin/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/admin/dashboard/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/admin/dashboard/profile",
      },
      {
        title: "Edit Profile",
        path: "/admin/dashboard/edit-profile",
      },
    ],
  },
];
