import React from "react";
import CurrencyFormat from "react-currency-format";
import Button from "./Button/Button";

const MultiRangeSlider = ({
  minPrice,
  maxPrice,
  onMinChange,
  onMaxChange,
  onSubmit,
}) => {
  return (
    <div className="w-full">
      <div className="flex w-full flex-col gap-2 items-start">
        <div className="flex w-full flex-wrap gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <label className="text-sm">Min Price:</label>
            <input
              type="number"
              value={minPrice}
              onChange={(e) => onMinChange(e.target.value)}
              className="w-20 border rounded p-1"
            />
          </div>
          <CurrencyFormat
            value={minPrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"#"}
            renderText={(value) => (
              <h2 className=" text-[#5B5959] text-[14px] font-[600] font-OpenSans leading-[16px] mb-[1px]">
                {value}
              </h2>
            )}
          />
        </div>

        <div className="flex w-full flex-wrap gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <label className="text-sm">Max Price:</label>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => onMaxChange(e.target.value)}
              className="w-20 border rounded p-1"
            />
          </div>
          <CurrencyFormat
            value={maxPrice}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"#"}
            renderText={(value) => (
              <h2 className=" text-[#5B5959] text-[14px] font-[600] font-OpenSans leading-[16px] mb-[1px]">
                {value}
              </h2>
            )}
          />
        </div>

        <Button
          ripple={true}
          onClick={onSubmit}
          className="bg-[#033514] text-white py-[14px] px-[21px] gap-[10px] inline-flex "
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default MultiRangeSlider;
