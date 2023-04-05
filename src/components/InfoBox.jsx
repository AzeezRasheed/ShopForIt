import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { FaShippingFast } from "react-icons/fa";
const data = [
  {
    icon: <FaShippingFast size={26} />,
    title: "Quick Shipping Delivery ",
    description: "Delivery of orders ",
  },
  {
    icon: <FaShippingFast size={26} />,
    title: "24x7 Support",
    description: "Contact us 24 hours a day, 7 days a week",
  },
  {
    icon: <FaShippingFast size={26} />,
    title: "Payment Secure",
    description: "Secured Payment Gateway",
  },
  {
    icon: <FaShippingFast size={26} />,
    title: "30 Days Return",
    description: "Terms & Condition Apply",
  },
];

const Container = styled.div`
  ${tw`
flex flex-wrap items-center gap-4 justify-center m-auto w-full mb-10
`}
`;

const Box = styled.div`
  ${tw`
flex w-[284px] h-[178px] border border-solid border-[#5C6273] 
`}
`;
function InfoBox() {
  return (
    <Container>
      {data.map((data, i) => (
        <Box key={i}>
          <div className="flex flex-col items-center m-auto gap-1">
            <span className="text-white">{data.icon}</span>
            <h2 className="font-Roboto font-normal ext-[20px] leading-[23px] text-white  ">
              {data.title}
            </h2>
            <p className="font-normal font-Montserrat text-[11px] leading-[16px] tracking-[0.2px] text-white w-full max-w-[174px] text-center  ">
              {data.description}
            </p>
          </div>
        </Box>
      ))}
    </Container>
  );
}

export default InfoBox;
