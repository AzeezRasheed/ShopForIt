import React from 'react'
import styled from 'styled-components';
import tw from 'twin.macro';
import TopCollectionData from "./TopCollectionData";


const OURTOPCOLLECTION = styled.div`
  ${tw`
 flex flex-col gap-20 items-center w-full h-full m-auto mb-20
`}
`;

const BUTTON = styled.button`
  ${tw`
px-10 py-4 items-center text-center rounded-lg text-[15px] font-normal leading-[18px] font-Roboto
`}
`;

const WIGSBUTTON = styled(BUTTON)`
  ${tw`
bg-[#079627] text-white
`}
`;

const EXTENSIONSBUTTON = styled(BUTTON)`
  ${tw`
bg-[#BFE6C8] text-[#787878]
`}
`;

const ACCESSORIESBUTTON = styled(BUTTON)`
  ${tw`
bg-[#BFE6C8] text-[#787878]
`}
`;
function TopCollection() {
  return (
    <OURTOPCOLLECTION>
          <div className="flex flex-col gap-2 items-center text-center ">
            <h2 className="font-Montserrat font-semibold text-[32px]  text-white  ">
              Our Top Collection
            </h2>
            <p className="font-Montserrat text-[15px] leading-[24px] font-normal tracking-[0.2px] items-end text-[#EDE1E1] mb-[0.5px] ">
              Browse the collection of the top product
            </p>

            <div>
              <div className="flex flex-wrap items-center justify-center gap-2">
                <WIGSBUTTON>Wigs</WIGSBUTTON>
                <EXTENSIONSBUTTON>Extensions</EXTENSIONSBUTTON>
                <ACCESSORIESBUTTON>Accessories</ACCESSORIESBUTTON>
              </div>
            </div>
          </div>

          <div className="justify-center align-middle flex items-center m-auto w-full h-full ">
            <div className="flex flex-wrap gap-6 items-center justify-center w-full ">
              {TopCollectionData.map((data, i) => (
                <div className="flex flex-col items-center text-center justify-start mb-6">
                  <div className="w-[215px] h-[225px] items-center  mb-2 ">
                    <img src={data.image} alt="..." className="w-full h-full" />
                  </div>
                  <h2 className="font-Roboto font-normal leading-[19px] text-center text-[16px] text-white w-full max-w-[201px] mb-1.5 ">
                    {data.title}
                  </h2>
                  <span
                    style={{ textDecoration: "line-through" }}
                    className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto mb-1.5  "
                  >
                    {data.oldPrice}
                  </span>
                  <span className=" text-white text-center text-[14px] leading-[16px] font-light font-Roboto  ">
                    {data.oldPrice}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </OURTOPCOLLECTION>
  )
}

export default TopCollection
