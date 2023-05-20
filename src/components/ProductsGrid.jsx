import React from "react";
import categoryData from "../data/categoryData";
import Typography from "./Typography/Typography";
import { AiOutlineHeart } from "react-icons/ai";
import { useGetProducts } from "../redux/product/productSlice";
import { useNavigate } from "react-router";

const ProductsGrid = () => {
  const navigate = useNavigate();
  const products = useGetProducts();
  return (
    <div className="justify-center md:align-baseline align-middle items-center flex md:items-start m-auto w-full h-full pt-6 ">
      <div className="flex flex-wrap gap-14 items-center md:items-start justify-center md:justify-start w-full ">
        {products.map((data, i) => (
          <button
            key={i}
            onClick={() => {
              navigate(`/products/info/${data._id}`);
            }}
            className="flex flex-col items-center cursor-pointer text-center justify-start mb-6"
          >
            <div
              style={{
                padding: "10px",
                border: "1px solid #EDE1E1",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "6px",
                position: "relative",
              }}
            >
              <div className="absolute bg-[#079627] rounded-[3px] px-4 py-1 left-[4px] top-[3px]  ">
                <Typography variant="white">Sale</Typography>
              </div>
              <div className="w-[230.56px] h-[225.81px] items-center  ">
                <img
                  src={data?.images[0]?.filePath}
                  alt="..."
                  className="w-full h-full"
                />
              </div>
            </div>
            <Typography variant="black" size="heading6" className="mb-2">
              {data?.title}
            </Typography>
            <div className="flex gap-2">
              <span
                style={{ textDecoration: "line-through" }}
                className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto mb-1.5  "
              >
                {data?.oldPrice}
              </span>
              <Typography variant="black" size="lightText">
                {data?.newPrice}
              </Typography>
            </div>
            <div className="flex gap-2 items-center">
              <span className=" text-[#CFCFCF] text-[14px] leading-[16px] font-medium font-Roboto ">
                {data?.quantity} Unit in Stock
              </span>
              <AiOutlineHeart size={20} color="#000000" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductsGrid;
