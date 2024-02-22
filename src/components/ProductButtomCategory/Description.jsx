import React from "react";

const Description = ({ product }) => {
  return (
    <div className="relative overflow-x-auto">
      {product && product?.descriptions ? (
        <div className="flex flex-wrap items-center text-center gap-3  ">
          {product?.descriptions.map((description) => {
            return (
              <div className="flex flex-row flex-wrap gap-3 text-start">
                <h2 className="text-[#9F9F9F] font-Poppins text-[16px] font-[600]  ">
                  {description?.name}:
                </h2>
                <h2 className="text-[#9F9F9F] font-Poppins text-[16px] font-[400]">
                  {description?.value}
                </h2>
              </div>
            );
          })}
        </div>
      ) : (
        <p>no description</p>
      )}
    </div>
  );
};

export default Description;
