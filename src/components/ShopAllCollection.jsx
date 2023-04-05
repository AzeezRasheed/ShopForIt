import React, { useState } from "react";
import styled from "styled-components";
import Collection2 from "../assets/Collection2.png";
import tw from "twin.macro";

const SHOPALLCOLLECTION = styled.div`
  ${tw`
 flex flex-col mb-20
`}
`;

function ShopAllCollection() {
  const [showRightCollectionOverlay, setRightOverlay] = useState(false);
  const [showLeftCollectionOverlay, setLeftOverlay] = useState(false);
  return (
    <SHOPALLCOLLECTION>
      <div className="flex flex-col items-center text-center mb-20">
        <h2 className="font-Montserrat font-semibold text-[24px] mb-[2px] text-white text-center ">
          Shop All Collection
        </h2>
        <hr className="h-0 w-full max-w-[227px] border border-solid border-[#737373] " />
      </div>

      <div className="flex flex-col lg:flex-row items-center  m-auto gap-10 ">
        <div>
          <div
            className="flex h-full w-full m-auto bg-[#EFEFEF] z-10 relative "
            onMouseEnter={() => setLeftOverlay(true)}
          >
            <div
              className={`bg-gray-800 bg-opacity-60 h-full w-full absolute inset-0 z-10 flex items-center justify-center  ${
                showLeftCollectionOverlay ? "" : "hidden"
              }`}
              onMouseLeave={() => setLeftOverlay(false)}
            >
              <div className="items-center justify-center m-auto  ">
                <button className=" uppercase bg-[#000000] px-3 py-2 text-[14px] leading-[24px] font-semibold text-white ">
                  order now
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row  w-[350px] h-full md:w-[575px] py-16 items-center   relative">
              <div className="flex flex-col gap-2 flex-end pl-6 flex-1 mb-16 md:mb-0  ">
                <h2 className="text-[17px] eading-[24px] text-[#414141] flex font-Montserrat font-semibold ">
                  New Trending
                </h2>
                <h3 className="font-Montserrat font-semibold text-[25px] leading-[24px] flex flex-end tracking-[0.2px] text-[#000000]  ">
                  Extensions
                </h3>
                <span className="text-[15px] font-normal leading-[20px] text-[#414141] font-Montserrat w-full max-w-[196px] ">
                  Buy 3 extensions an get 10% Discount
                </span>
              </div>

              <div className="relative">
                <div className=" pr-4 md:pr-28">
                  <div className="relative">
                    <div
                      style={{ zIndex: "-1" }}
                      className=" absolute   left-20 bottom-5 flex w-[148px] h-[191px] bg-[#D9D9D9]  border-[10px] border-solid border-[#FFFFFF]  "
                    ></div>
                    <div
                      style={{ zIndex: "9999" }}
                      className="  w-[157px] h-[168px] z-10 "
                    >
                      <img
                        src={Collection2}
                        alt="..."
                        className="w-full h-full  block"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div
            className="flex h-full w-full m-auto bg-[#EFEFEF] z-10 relative "
            onMouseEnter={() => setRightOverlay(true)}
          >
            <div
              className={`bg-gray-800 bg-opacity-60 h-full w-full absolute inset-0 z-10 flex items-center justify-center  ${
                showRightCollectionOverlay ? "" : "hidden"
              }`}
              onMouseLeave={() => setRightOverlay(false)}
            >
              <div className="items-center justify-center m-auto  ">
                <button className=" uppercase bg-[#000000] px-3 py-2 text-[14px] leading-[24px] font-semibold text-white ">
                  order now
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row  w-[350px] h-full md:w-[575px] py-16 items-center   relative">
              <div className="flex flex-col gap-2 flex-end pl-6 flex-1 mb-16 md:mb-0  ">
                <h2 className="text-[17px] leading-[24px] text-[#414141] flex font-Montserrat font-semibold ">
                  New Trending
                </h2>
                <h3 className="font-Montserrat font-semibold text-[25px] leading-[24px] flex flex-end tracking-[0.2px] text-[#000000]  ">
                  Extensions
                </h3>
                <span className="text-[15px] font-normal leading-[20px] text-[#414141] font-Montserrat w-full max-w-[196px] ">
                  Buy 3 extensions an get 10% Discount
                </span>
              </div>

              <div className="relative">
                <div className=" pr-4 md:pr-28">
                  <div className="relative">
                    <div
                      style={{ zIndex: "-1" }}
                      className=" absolute   left-20 bottom-5 flex w-[148px] h-[191px] bg-[#D9D9D9]  border-[10px] border-solid border-[#FFFFFF]  "
                    ></div>
                    <div
                      style={{ zIndex: "9999" }}
                      className="  w-[157px] h-[168px] z-10 "
                    >
                      <img
                        src={Collection2}
                        alt="..."
                        className="w-full h-full  block"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SHOPALLCOLLECTION>
  );
}

export default ShopAllCollection;
