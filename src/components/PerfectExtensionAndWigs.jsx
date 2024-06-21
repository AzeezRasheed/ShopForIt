import React from "react";
import Typography from "./Typography/Typography";
import Button from "./Button/Button";
import HEATFREEHAIR_FOR_WIGS from "../assets/HEATFREEHAIR-FOR-WIGS.png";
import HEATFREEHAIR_FOR_EXTENSIONS from "../assets/HEATFREEHAIR-FOR-EXTENSIONS.png";
import { useNavigate } from "react-router-dom";

const PerfectExtensionAndWigs = () => {
  const navigate = useNavigate();
  const items = [
    {
      title: "The perfect Extension.",
      description:
        "Our distinctive Extensions are designed to perfectly your hair and styles,",
      button_text: "SHOP  EXTENSIONS",
      bgColor: "#F3F8F6",
      image: HEATFREEHAIR_FOR_EXTENSIONS,
      link: "/products?category=Extensions",
    },
    {
      title: "The perfect Wig.",
      description:
        "Our unique wigs are made to precisely fit your hair type and style.",
      button_text: "SHOP  WIGS",
      bgColor: "#FFF",
      image: HEATFREEHAIR_FOR_WIGS,
      link: "/products?category=Wigs",
    },
  ];

  return (
    <div className=" flex items-center justify-center m-auto w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 w-full md:grid-cols-2 gap-4 md:gap-6">
        {items.map((item, index) => {
          return (
            <div
              className={`flex flex-col w-full gap-4 px-[40px] pt-[50px] pb-0 text-center items-center m-auto `}
              style={{ backgroundColor: item.bgColor }}
              key={index}
            >
              <Typography
                variant="black"
                className={
                  "md:text-[40px] text-[25px] font-normal capitalize font-Artifika leading-tight  "
                }
              >
                {item.title}
              </Typography>
              <div className="w-full max-w-[420px] text-center ">
                <Typography
                  variant="black"
                  className={
                    "text-[16px] font-normal capitalize font-Montserrat   "
                  }
                >
                  {item.description}
                </Typography>
              </div>

              <Button
                ripple={true}
                onClick={() => {
                  navigate(item?.link);
                }}
                className="bg-[#033514] text-white py-[14px] px-[21px] gap-[10px] inline-flex "
              >
                {item.button_text}
              </Button>

              <div className="w-[344px] h-full bg-white">
                <img
                  src={item.image}
                  className="w-full h-full bg-transparent"
                  alt="HEATFREEHAIR-FOR-COIL"
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerfectExtensionAndWigs;
