import React from "react";
import Stack from "./Stack/Stack";
import Typography from "./Typography/Typography";
import { AiOutlineHeart } from "react-icons/ai";
import Button from "./Button/Button";
import { useNavigate } from "react-router-dom";
import { useGetProducts } from "../redux/product/productSlice";

const ProductsList = () => {
  const navigate = useNavigate();
  const products = useGetProducts();
  return (
    <Stack direction="column" alignItems="center" className="gap-10 pt-6">
      {products.map((data, i) => (
        <div key={i} className="w-full flex flex-wrap ">
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="spacebetween"
            className="flex flex-wrap px-2"
          >
            {/* Left Row */}
            <div className="flex flex-wrap gap-3 items-center justify-center text-center ">
              <div
                style={{
                  padding: "0px",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "6px",
                  position: "relative",
                }}
              >
                <div className="absolute bg-[#079627] rounded-[3px] px-4 py-1 -left-[10px] -top-[10px]  ">
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
              <div className="flex flex-col gap-3 items-start text-start ">
                <Typography variant="black" size="heading6" className="">
                  {data?.title}
                </Typography>
                <span className=" text-[#CFCFCF] text-[14px] leading-[16px] font-medium font-Roboto ">
                  {data?.quantity} Unit in Stock
                </span>
                <AiOutlineHeart size={20} color="#000000" />
              </div>
            </div>

            {/* Right Row */}
            <div className="flex flex-col items-center text-center gap-2 ">
              <span
                style={{ textDecoration: "line-through" }}
                className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto   "
              >
                #{data?.oldPrice}
              </span>
              <Typography variant="black" size="lightText">
                #{data?.newPrice}
              </Typography>
              <Button
                ripple={true}
                onClick={() => {
                  navigate(`/products/info/${data._id}`);
                }}
              >
                <div className="px-4 py-4 items-center justify-center text-center bg-[#033514] ">
                  <Typography variant="white" size="buttons">
                    Select options
                  </Typography>
                </div>
              </Button>
            </div>
          </Stack>
        </div>
      ))}
    </Stack>
  );
};

export default ProductsList;
