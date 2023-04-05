import React from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import Collection2 from "../assets/Collection2.png";
import { useSnapCarousel } from "react-snap-carousel";
import styled from "styled-components";
import tw from "twin.macro";

const ScrollItem = styled.div`
  ${tw`
  bg-[#191D27] items-center relative cursor-pointer w-full min-w-full md:min-w-[575px] h-full flex flex-col md:flex-row gap-3 py-6 px-6
`}

  &:hover {
    box-shadow: 5px 14px 30px rgba(6, 16, 52, 0.15);
  }
`;

const Button = styled.button`
  ${tw`
  px-2 py-2 items-center text-center font-bold text-xs md:text-[14px] leading-[24px]  tracking-[0.2px]
`}
`;

const OrderNow = styled(Button)`
  ${tw`
  text-white bg-[#000000]
`}
`;

const AddToCart = styled(Button)`
  ${tw`
  text-white bg-[#000000]
`}
`;

const Container = styled.div`
  ${tw`
  flex flex-col gap-6 items-center w-full max-w-[575px] h-full 
`}
`;

const InnerWrapper = styled.div`
  ${tw`
  flex justify-between py-2 px-0  border-b border-solid border-[#737373] w-full
`}
`;

const Header = styled.h2`
  ${tw`
  font-Montserrat font-bold text-white text-[24px] text-center 
`}
`;

const ButtonWrapper = styled.div`
  ${tw`
  flex gap-0.5 items-center text-white
`}
`;

const Image = styled.img`
  ${tw`
  w-[185px]  h-full items-center

`}
`;
const Title = styled.h2`
  ${tw`
  font-Roboto font-normal text-[20px] leading-[23px] text-white
`}
`;

const Reviews = styled.span`
  ${tw`
  font-Montserrat font-normal text-[10px] leading-[24px] tracking-[o.2px] items-end text-white
`}
`;

const Description = styled.p`
  ${tw`
  font-Montserrat font-normal text-[11px] leading-[16px] tracking-[0.2px] items-end text-white 
`}
`;

const OldPrice = styled.span`
  ${tw`
  text-[#CFCFCF]  text-[14px] text-center leading-[16px] font-light font-Roboto mb-1.5 
`}
`;

const CurrentPrice = styled.span`
  ${tw`
  text-white  text-[14px] text-center leading-[16px] font-light font-Roboto 
`}
`;

const SliderContainer = styled.div`
  ${tw`
  flex w-full h-full max-w-[575px]
`}
`;

const SeasonsSalesData = [
  {
    image: Collection2,
    title: "Cuticle Aligned Hair 4x4 Closure Lace Front Wig",
    reviews: "4",
    description:
      "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ",
    oldPrice: "#11,000 - #16,700",
    currentPrice: "#10,000 - #15,000",
  },
  {
    image: Collection2,
    title: "Cuticle Aligned Hair 4x4 Closure Lace Front Wig",
    reviews: "4",
    description:
      "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ",
    oldPrice: "#11,000 - #16,700",
    currentPrice: "#10,000 - #15,000",
  },
  {
    image: Collection2,
    title: "Cuticle Aligned Hair 4x4 Closure Lace Front Wig",
    reviews: "4",
    description:
      "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ",
    oldPrice: "#11,000 - #16,700",
    currentPrice: "#10,000 - #15,000",
  },
  {
    image: Collection2,
    title: "Cuticle Aligned Hair 4x4 Closure Lace Front Wig",
    reviews: "4",
    description:
      "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ",
    oldPrice: "#11,000 - #16,700",
    currentPrice: "#10,000 - #15,000",
  },
  {
    image: Collection2,
    title: "Cuticle Aligned Hair 4x4 Closure Lace Front Wig",
    reviews: "4",
    description:
      "cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa ",
    oldPrice: "#11,000 - #16,700",
    currentPrice: "#10,000 - #15,000",
  },
];

function BlackFridaySales() {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  return (
    <Container>
      <InnerWrapper>
        <Header>Black Friday Sales</Header>
        <ButtonWrapper>
          <button onClick={() => prev()}>
            <BiChevronLeft />
          </button>
          <button onClick={() => next()}>
            <BiChevronRight />
          </button>
        </ButtonWrapper>
      </InnerWrapper>

      <SliderContainer>
        <div
          ref={scrollRef}
          style={{
            display: "flex",
            overflow: "hidden",
            gap: "10px",
            width: "100%",
            height: "100%",
            alignItems: "center",
            scrollSnapType: "x mandatory",
          }}
        >
          {SeasonsSalesData.map((item, index) => (
            <ScrollItem key={index} onClick={() => {}}>
              <Image src={item.image} alt="..." />

              <div className="flex flex-col gap-2 text-start items-start ">
                <Title>{item.title}</Title>
                <Reviews>{item.reviews} Reviews</Reviews>
                <Description>{item.description}</Description>
                <div className="flex flex-col items-end">
                  <OldPrice style={{ textDecoration: "line-through" }}>
                    {item.oldPrice}
                  </OldPrice>
                  <CurrentPrice>{item.currentPrice}</CurrentPrice>
                </div>
                <div className="flex gap-3 items-center">
                  <OrderNow onClick={() => {}}>ORDER NOW</OrderNow>
                  <AddToCart onClick={() => {}}>ADD TO CART</AddToCart>
                </div>
              </div>
            </ScrollItem>
          ))}
        </div>
      </SliderContainer>
    </Container>
  );
}

export default BlackFridaySales;
