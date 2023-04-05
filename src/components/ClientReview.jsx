import React, { useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { useSnapCarousel } from "react-snap-carousel";
import { AiTwotoneStar } from "react-icons/ai";
import Testimonial1 from "../assets/Testimonial1.png";
import Testimonial2 from "../assets/Testimonial2.png";
import Testimonial3 from "../assets/Testimonial3.png";
import {ImQuotesLeft, ImQuotesRight} from "react-icons/im"


const Container = styled.section`
  ${tw`
bg-[#2D323D] flex items-center w-full h-full max-w-screen-2xl justify-center  m-auto
`}
`;

const InnerWrapper = styled.div`
  ${tw`
 flex flex-col gap-6 items-center w-full h-full m-auto py-14 px-6 md:px-20
`}
`;

const SliderContainer = styled.div`
  ${tw`
  flex w-full h-full max-w-[846px] items-center justify-center relative
`}
`;

const ScrollItem = styled.div`
  ${tw`
  bg-[#23262F] items-center relative cursor-pointer w-full min-w-full h-full flex flex-col md:flex-row gap-3 py-6 px-6
`}
`;

const user = [
  {
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    name: "Esther .N",
    work: "Entrepreneur",
  },
  {
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    name: "Rasheedat .N",
    work: "Laugher",
  },
  {
    description:
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    name: "Lukurat .N",
    work: "Smiler",
  },
];

function ClientReview() {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();

  const starAverage = 5;
  const fullStars = Math.floor(starAverage);

  const starArr = [];

  for (let i = 1; i <= fullStars; i++) {
    starArr.push(1);
  }

  if (starAverage < 5) {
    const partialStar = starAverage - fullStars;

    starArr.push(partialStar);

    const emptyStars = 5 - starArr.length;

    for (let i = 1; i <= emptyStars; i++) {
      starArr.push(0);
    }
  }

  const [isActive, setActive] = useState("");

  const image = [
    "https://randomuser.me/api/portraits/women/79.jpg",
    "https://randomuser.me/api/portraits/women/44.jpg",
    "https://randomuser.me/api/portraits/women/69.jpg",
  ];
  return (
    <Container>
      <InnerWrapper>
        <div className="flex flex-col items-center m-auto text-center mb-3">
          <h2 className="font-Montserrat font-bold text-[32px] mb-1 text-white ">
            Client Review
          </h2>
          <h3 className="font-Montserrat font-normal text-[15px] leading-[24px] mb-1 text-[#EDE1E1] ">
            What our client says about us.
          </h3>
        </div>

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
            {user.map((user, index) => {
              return (
                <ScrollItem key={index} onClick={() => {}}>
                  <div className="flex flex-col gap-8 items-center p-6 justify-center w-full  ">
                    <p className="font-Montserrat font-normal   text-[15px] leading-[24px] items-end text-center racking-[0.2px] text-white ">
                      {user.description}
                    </p>

                    <div className="flex flex-col items-center">
                      <h2 className="font-Montserrat font-bold text-[24px] text-center text-white ">
                        {user.name}
                      </h2>
                      <span className=" mb-4 font-Montserrat font-normal text-[15px] leading-[24px] items-end  tracking-[0.2px] text-[#EDE1E1] ">
                        {user.work}
                      </span>
                      <div className="flex flex-row justify-between gap-1 items-center m-auto text-[#079627] ">
                        {starArr.map((val, i) => {
                          return (
                            <div key={i}>
                              <AiTwotoneStar />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </ScrollItem>
              );
            })}
          </div>


          <div className="absolute -top-3 left-8 text-white ">
            <ImQuotesLeft size={28}/>
          </div>
          <div className="absolute -bottom-3 right-8 text-white ">
            <ImQuotesRight size={28}/>
          </div>
        </SliderContainer>

        <div className="flex flex-wrap gap-6 items-center m-auto ">
          {pages.map((page, index) => (
            <button
              className="rounded-full "
              onClick={() => {
                setActive(index);
                goTo(index);
              }}
            >
              <img
                src={image[index]}
                alt="user"
                className={`cursor-pointer transition duration-200 ease-in-out transform hover:scale-x-105  rounded-full
                 h-${isActive === index ? "16" : "12"} 
                 w-${isActive === index ? "16" : "12"}  
  
                 `}
              />
            </button>
          ))}
        </div>
      </InnerWrapper>
    </Container>
  );
}

export default ClientReview;
