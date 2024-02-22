import React from "react";
import EasterSales from "./EasterSales";
import BlackFridaySales from "./BlackFridaySales";
import styled from "styled-components";
import tw from "twin.macro";

const SeasonsSales = styled.div`
  ${tw`
 flex flex-wrap justify-between w-full items-center w-full  px-8 mb-20
`}
`;
function SeasonSales() {
  return (
    <SeasonsSales>
      {/* <EasterSales />
      <BlackFridaySales /> */}
    </SeasonsSales>
  );
}

export default SeasonSales;
