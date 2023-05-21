import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
//For Carousel, The library is react-slick
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import FirstImage from "../assets/Frame 483.png";
import SecondImage from "../assets/SecondHeroCarousel.png";

const Container = styled.section`
  ${tw`
  w-full px-0 mx-0 
`}
`;

const FLEXITEMS = styled.div`
  ${tw`
lg:flex  w-full h-full px-4 py-6 items-center justify-center m-auto gap-6
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
  //The settings for the carousel
  const settings = {
    dots: true,
    dotClass: "slick-dots slick-thumb ",
    // asNavFor: '.slider',
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 8000,
    cssEase: "linear",
    pauseOnHover: false,
  };

  //The images are stored in an array
  const slides = [
    {
      url: FirstImage,
    },
    {
      url: SecondImage,
    },
  ];
  return (
    <Container
      style={{ background: "linear-gradient(0deg, #F7F7F7, #F7F7F7)" }}
    >
      <Slider {...settings}>
        <div className="  m-auto relative">
          <div
            // style={{ backgroundImage: `url(${slides[0].url})` }}
            className=" bg-white relative overflow-hidden bg-no-repeat images object-contain bg-cover  mx-auto  py-12 lg:pt-0 md:py-20  lg:flex lg:h-screen lg:items-center"
          >
            <div className="mx-auto flex flex-col items-center  text-center z-10 gap-4">
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
            </div>
          </div>
        </div>

        {/* second */}
        <div className="  m-auto relative">
          <div
            // style={{ backgroundImage: `url(${slides[0].url})` }}
            className=" bg-white relative overflow-hidden bg-no-repeat images object-contain bg-cover  mx-auto  py-12 lg:py-0 md:py-20 lg:flex lg:h-screen lg:items-center"
          >
            <div className="mx-auto flex flex-col items-center  text-center z-10 gap-4">
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
            </div>
          </div>
        </div>
      </Slider>
    </Container>
  );
}

export default HeroSection;
