import React from "react";

const ShippingAndReturns = () => {
  return (
    <div className="w-full max-w-[821px] px-1 items-center text-center  ">
      <div className="flex flex-col gap-4 items-center">
        <h2 className="text-[#9F9F9F] font-Poppins text-[16px] font-[600]  ">
          Orders will ship within 24 hours if placed Monday- Friday before 10 AM
          WAT, excluding holidays and sale periods. We work with trusted
          shipping carriers, but recommend purchasing Route Package Protection
          to insure your package.
        </h2>
        <h2 className="text-[#9F9F9F] font-Poppins text-[16px] font-[600]  ">
          It’s Important to note that shipping fee as it is charged based on the
          courier company handling your order.
        </h2>
      </div>
    </div>
  );
};

export default ShippingAndReturns;
