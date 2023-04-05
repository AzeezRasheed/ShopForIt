import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import Image from "../assets/Frame 483.png";
const Container = styled.section`
  ${tw`
max-w-screen-2xl flex w-full h-full items-center flex m-auto relative
`}
`;

const FLEXITEMS = styled.div`
  ${tw`
lg:flex  w-full h-full px-4 py-6 items-center justify-center m-auto gap-6
`}
`;

const SLIDER = styled.div`
  ${tw`
flex flex-col gap-4 items-start text-start z-10
`}
`;

const TITLE = styled.h1`
  ${tw`
text-[#000000] capitalize leading-[130%] text-[48px] font-bold tracking-[-0.01em] font-Montserrat mb-1
`}
`;

const BUTTON = styled.button`
  ${tw`
flex items-center m-auto px-10 py-4 rounded-lg bg-[#033514] text-white text-center text-[15.9px] leading-[24px] font-Poppins
`}
`;

function HeroSection() {
  return (
    <Container
      style={{ background: "linear-gradient(0deg, #F7F7F7, #F7F7F7)" }}
    >
      <FLEXITEMS>
        <SLIDER>
          <div className="flex flex-col ">
            <TITLE>
              New Hair <span className="text-green-500">Collection</span>
            </TITLE>
            <h2 className="font-Montserrat font-medium text-[36px] leading-[44px] text-[#000000] font-">
              Summer Sale
            </h2>
          </div>
          <p className="font-Montserrat EXT-[15px] leading-[24px] tracking-[0.2px] font-normal flex w-full max-w-[425px] ">
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa
          </p>

          <div>
            <BUTTON>Order Now</BUTTON>
          </div>
        </SLIDER>
        <div className="hidden lg:block" style={{ zIndex: "" }}>
          <img src={Image} alt="..." className="h-full w-full" />
        </div>
      </FLEXITEMS>
    </Container>
  );
}

export default HeroSection;
