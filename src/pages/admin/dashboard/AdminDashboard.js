import React, { useEffect, useState } from "react";
import { getProducts } from "../../../redux/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import ProductList from "../../../components/Admin/Product/ProductList";
import ProductSummary from "../../../components/Admin/Product/ProductSummary";
import PieChart from "../../../components/Admin/PieChart/PieChart";
import Stack from "../../../components/Stack/Stack";
import Typography from "../../../components/Typography/Typography";
import styled from "styled-components";
import tw from "twin.macro";
import { FiFolder } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../../services/authServices";
import Spinner from "../../../components/Loader/Spinner";

const Boxs = styled.div`
  ${tw`
w-full
md:w-[232px]
h-[92px]
border 
border-solid
border-[#B165E9]
rounded-[12px]
items-center
justify-center
`}
`;

const Box = ({ label, color, number }) => (
  <Boxs
    style={{
      backgroundColor: color,
    }}
  >
    <div className="m-auto flex items-center text-center h-full justify-center">
      <Stack
        direction="column"
        justifyContent="spacebetween"
        alignItems="center"
        className="p-4 gap-6 text-center"
      >
        <Stack
          direction="row"
          justifyContent="spacebetween"
          alignItems="center"
        >
          <Typography
            as={"h4"}
            variant="bold"
            className="leading-[15px] text-[14px] font-bold font-Inter"
          >
            {label}
          </Typography>
          <span className="text-[#292D32]">
            <FiFolder size={28} />
          </span>
        </Stack>
        <Stack
          direction="row"
          justifyContent="spacebetween"
          alignItems="center"
        >
          <div></div>
          <Typography
            as={"h3"}
            variant="black"
            className="leading-[15px] text-[20px] font-bold font-Inter"
          >
            {number}
          </Typography>
        </Stack>
      </Stack>
    </div>
  </Boxs>
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const firstname = localStorage.getItem("firstname")
    ? JSON.parse(localStorage.getItem("firstname"))
    : "";
  const navigate = useNavigate();

  const logout = async () => {
    localStorage.removeItem("firstname");
    localStorage.removeItem("token");
    await logoutUser();
    navigate("/");
  };

  // const isLoggedIn = useSelector(selectIsLoggedIn());
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch]);

  const [filteredWigs, setFilteredWigs] = useState({});
  const [filteredExtensions, setFilteredExtensions] = useState({});
  const [filtereAccessories, setFilteredAccessories] = useState({});

  // Filter for wigs
  useEffect(() => {
    const filteredWigs = products.filter(
      (product) =>
        product?.collections &&
        product?.collections.toLowerCase().includes("Wigs".toLowerCase())
    );
    setFilteredWigs(filteredWigs);
  }, [products]);

  // Filter for extensions
  useEffect(() => {
    const filteredExtensions = products.filter(
      (product) =>
        product?.collections &&
        product?.collections.toLowerCase().includes("Extensions".toLowerCase())
    );
    setFilteredExtensions(filteredExtensions);
  }, [products]);

  // Filter for accessories
  useEffect(() => {
    const filteredAccessories = products.filter(
      (product) =>
        product?.collections &&
        product?.collections.toLowerCase().includes("Accessories".toLowerCase())
    );
    setFilteredAccessories(filteredAccessories);
  }, [products]);

  const wigsLength = filteredWigs.length;
  const accessoriesLength = filtereAccessories.length;
  const extensionsLength = filteredExtensions.length;
  return (
    <div>
      {isLoading && <Spinner />}
      <div className="flex flex-col px-6">
        <div className="flex flex-col gap-2 mb-4  ">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 text-center items-center">
              <h2 className=" text-[18px] lg:text-[28px] md:text-[24px] text-slate-500 leading-[10px]">
                Welcome,
              </h2>
              <h2 className="text-[18px] lg:text-[28px] md:text-[24px] text-red-500 font-bold leading-[10px]">
                {firstname}
              </h2>
            </div>
            <button
              onClick={() => logout()}
              className="flex-shrink-0  lg:m-0 bg-red-500 hover:bg-red-700 border-red-500 hover:border-red-700 text-sm border-4 text-white py-1 px-2 rounded"
            >
              Logout
            </button>
          </div>
          <hr className="border-4 border-blue-500 cursor-pointer hover:border-red-500 duration-500" />
        </div>
        <div>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            className="m-auto px-3 py-4"
          >
            <Stack
              direction="row"
              alignItems="center"
              className="flex-wrap justify-between   gap-3 mb-4"
            >
              <Box label="Wigs" color="#E8E9F7" number={wigsLength} />
              <Box
                label="Extensions"
                color="#D9DAF5"
                number={extensionsLength}
              />
              <Box
                label="Accessories"
                color="#BCBDF5"
                number={accessoriesLength}
              />
            </Stack>
          </Stack>
          <div className="  bg-[#F7FEFF] max-w-[300px] rounded-[12px] items-center px-4 py-3 gap-2 mb-6">
            <PieChart />
          </div>
          <ProductList products={products} isLoading={isLoading} />
          <ProductSummary />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
