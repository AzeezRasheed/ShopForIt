import React, { useEffect, useState } from "react";
import { IoIosCheckmark } from "react-icons/io";

const ProductInfoShowPopup = ({ isItemInCart, title, inchesType }) => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (isItemInCart) {
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
      }, 5000);
    }
  }, [isItemInCart]);

  const textStyle = {
    color: "#000",
    fontFamily: "Montserrat",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "130%",
    display: "flex",
    alignItems: "center",
  };

  const underlineStyle = {
    textDecorationLine: "underline",
    marginLeft: "3px",
  };

  return (
    <>
      {showPopup && (
        <div className="fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none  ">
          <div className="min-[576px] mx-auto mt-7 max-w-[800px]">
            <div className="relative flex flex-col items-center rounded-md border-none bg-[#E5EFE5] bg-clip-padding text-current shadow-lg outline-none">
              <div className="flex items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
                <h5 style={textStyle}>
                  <span className="text-green-400">
                    <IoIosCheckmark size={20} />
                  </span>{" "}
                  You added {title} Stretched Length: {inchesType} Inches to
                  your<span style={underlineStyle}>shopping cart.</span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfoShowPopup;
