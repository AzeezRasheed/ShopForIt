import React from "react";
import CurrencyFormat from "react-currency-format";
import { useNavigate } from "react-router";
import styled from "styled-components";
import tw from "twin.macro";

const PriceText = styled.span`
  ${tw`
    text-[#9F9F9F]
    text-center
    text-[13px]
    leading-[16px]
    font-[600]
    font-OpenSans
    mb-1.5
  `}
`;

const ProductsGrid = ({ key, data }) => {
  const navigate = useNavigate();
  return (
    <button
      key={key}
      onClick={() => {
        navigate(`/products/info/${data._id}`);
      }}
      className="productGridButtonClass  flex flex-col w-[182.5px] md:w-full items-start p-[14px] bg-white rounded-sm cursor-pointer text-start justify-start mb-6"
    >
      <div
        style={{
          // border: "1px solid #EDE1E1",

          alignItems: "center",
          justifyContent: "center",
          marginBottom: "6px",
          position: "relative",
        }}
        className="w-full"
      >
        {/* <div className="absolute bg-[#079627] rounded-[3px] px-4 py-1 left-[4px] top-[3px]  ">
          <Typography variant="white">Sale</Typography>
        </div> */}
        <div className="w-full  h-full items-center  ">
          <img
            src={data?.images[0]?.filePath}
            alt="..."
            className="w-full h-full"
          />
        </div>
      </div>
      <div className="flex flex-col items-start  text-start">
        <h2 className=" text-[#5B5959] text-[12px] font-[400] font-OpenSans leading-[16px] mb-[1px]">
          {data?.collections}
        </h2>
        <h2 className=" text-[#5B5959] text-[14px] font-[600] font-OpenSans leading-[16px] mb-[10px]">
          {data?.title}
        </h2>
        <CurrencyFormat
          value={data?.newPrice}
          displayType={"text"}
          thousandSeparator={true}
          prefix={"#"}
          renderText={(value) => (
            <h2 className=" text-[#5B5959] text-[16px] font-[600] font-OpenSans leading-[16px] mb-[1px]">
              {value}
            </h2>
          )}
        />
      </div>
      {/* <div className="flex gap-2 items-center">
        <span className=" text-[#CFCFCF] text-[14px] leading-[16px] font-medium font-Roboto ">
          {data?.quantity} Unit in Stock
        </span>
        <AiOutlineHeart size={20} color="#000000" />
      </div> */}
    </button>
  );
};

export default ProductsGrid;
