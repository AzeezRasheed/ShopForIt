import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

import TopCollection from "./TopCollection";
import ShopAllCollection from "./ShopAllCollection";
import TopCategory from "./TopCategory";
import SeasonSales from "./SeasonSales";
import InfoBox from "./InfoBox";

const CONTAINER = styled.section`
  ${tw`
bg-[#23262F] flex items-center w-full h-full max-w-screen-2xl justify-center  m-auto
`}
`;

const InnerWrapper = styled.div`
  ${tw`
 flex flex-col gap-6 items-center w-full h-full m-auto py-14 px-6 md:px-20
`}
`;

function Collection() {
  return (
    <CONTAINER>
      <InnerWrapper>
        <TopCollection />
        <ShopAllCollection />
        <TopCategory />
        <SeasonSales />
        <InfoBox />
      </InnerWrapper>
    </CONTAINER>
  );
}

export default Collection;
