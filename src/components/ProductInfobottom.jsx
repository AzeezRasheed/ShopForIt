import React, { useState } from "react";
import Stack from "./Stack/Stack";
import Button from "./Button/Button";
import Description from "./ProductButtomCategory/Description";
import AdditionalInformation from "./ProductButtomCategory/AdditionalInformation";
import Reviews from "./ProductButtomCategory/Reviews";
import ShippingAndReturns from "./ProductButtomCategory/ShippingAndReturns";

const tabs = [
  { name: "Description", id: "description" },
  { name: "Shipping And Returns", id: "shipping and returns" },
  { name: "Reviews", id: "reviews" },
];

const ProductInfoBottom = ({ product }) => {
  const [tab, setTab] = useState("description");

  const Tab = () =>
    tabs.map((type, i) => (
      <div key={i}>
        <Button
          ripple={true}
          onClick={() => {
            setTab(type.id);
          }}
        >
          <div
            className={`${
              type.id === tab && "border-b-[3px] border-[#079627]"
            }  w-full  bottom-0 z-10 py-2`}
          >
            <h2
              className={`font-${
                type.id === tab ? "bold" : "normal"
              } text-[16px] leading-[130%] font-Montserrat`}
            >
              {type.name}
            </h2>
          </div>
        </Button>
      </div>
    ));

  const TabPanel = () => {
    switch (tab) {
      case "description":
        return <Description product={product} />;
      case "additional information":
        return <AdditionalInformation product={product} />;
      case "shipping and returns":
        return <ShippingAndReturns />;
      default:
        return <Reviews product={product} />;
    }
  };
  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      className={"gap-8 max-w-[1098px] "}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        className={"gap-3  mt-6 relative z-10 "}
      >
        {Tab()}
        <div className="border-b border-b-[#D9D9D9] absolute h-0 w-full bottom-[1px] -z-10  "></div>
      </Stack>

      {TabPanel()}
    </Stack>
  );
};

export default ProductInfoBottom;
