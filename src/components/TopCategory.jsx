import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import { BsBoxArrowDownRight } from "react-icons/bs";
import TIMAGE from "../assets/Rectangle 4366.png";

const TOPCATEGORIES = styled.div`
  ${tw`
 flex flex-col 
`}
`;
function TopCategory() {
  return (
    <TOPCATEGORIES>
    <div className="flex flex-col items-center text-center mb-20">
      <div className="flex flex-col items-center m-auto text-center mb-3">
        <h2 className="font-Montserrat font-bold text-[32px] mb-2 text-white ">
          Top Categories
        </h2>
        <h3 className="font-Montserrat font-normal text-[15px] leading-[24px] mb-1 text-[#EDE1E1] ">
          Browse the collection of the top category{" "}
        </h3>
      </div>

      <div className="flex flex-wrap justify-center items-center m-auto w-full gap-8 ">
        <div className="flex flex-wrap items-center ">
          <div className="flex flex-wrap lg:flex-col gap-4 items-start   ">
            <button className="  w-full md:w-[286px] h-[70px] items-center bg-[#191D27] hover:bg-[#2D323D] flex text-start font-Roboto font-normal text-[15px] leading-[18px] text-white ">
              <span className="pl-3 flex">
                <BsBoxArrowDownRight className="mr-4" size={20} />
                <span>Wigs</span>
              </span>
            </button>

            <button className=" w-full md:w-[286px] h-[70px] items-center bg-[#191D27] hover:bg-[#2D323D] flex text-start font-Roboto font-normal text-[15px] leading-[18px] text-white ">
              <span className="pl-3 flex">
                <BsBoxArrowDownRight className="mr-4" size={20} />
                <span>Extensions</span>
              </span>
            </button>

            <button className=" w-full md:w-[286px] h-[70px] items-center bg-[#191D27] hover:bg-[#2D323D] flex text-start font-Roboto font-normal text-[15px] leading-[18px] text-white ">
              <span className="pl-3 flex">
                <BsBoxArrowDownRight className="mr-4" size={20} />
                <span>Accessories</span>
              </span>
            </button>

            <button className=" w-full md:w-[286px] h-[70px] items-center bg-[#191D27] hover:bg-[#2D323D] flex text-start font-Roboto font-normal text-[15px] leading-[18px] text-white ">
              <span className="pl-3 flex">
                <BsBoxArrowDownRight className="mr-4" size={20} />
                <span>Wigs</span>
              </span>
            </button>
          </div>
        </div>
        <div className=" flex flex-1 h-[321px] ">
          <img src={TIMAGE} alt="..." />
        </div>
      </div>
    </div>
  </TOPCATEGORIES>
  )
}

export default TopCategory
