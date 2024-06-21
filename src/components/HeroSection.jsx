import React from "react";
import tw from "twin.macro";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Typography from "./Typography/Typography";
import Button from "./Button/Button";
import HEATFREEHAIR from "../assets/HEATFREEHAIR-FOR-KOILS.png";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";

function HeroSection() {
  const isTabletOrMobile = useMediaQuery({ maxWidth: "768px" });
  const navigate = useNavigate();
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
  // const slides = [
  //   {
  //     url: FirstImage,
  //   },
  //   {
  //     url: SecondImage,
  //   },
  // ];
  return (
    <div style={styles.container}>
      <Slider {...settings}>
        <div className="  m-auto relative z-10 md:px-20">
          <div
            style={{
              ...styles.innerContainer,
            }}
          >
            {/* left */}
            <div style={styles.left}>
              <div className="w-full max-w-[650px] mb-[80px] relative ">
                <Typography
                  variant="black"
                  className={
                    "md:text-[85px] text-[48px] t font-normal capitalize font-Artifika w-full leading-tight  "
                  }
                >
                  Be exquisite. be you,
                </Typography>

                <div className="absolute md:right-20 md:-bottom-16 lg:-bottom-[80px] lg:right-[44px] -bottom-24 right-0 ">
                  <Typography
                    variant="black"
                    className={
                      "text-[90px] text-[#079627] font-normal font-Sacramento w-full leading-[130%]  "
                    }
                  >
                    naturally.
                  </Typography>
                </div>
              </div>

              <div className="flex flex-col gap-4 items-start">
                <Typography
                  variant="black"
                  size="heading6"
                  className={"capitalize"}
                >
                  premium “shopfor.it” product designed exclusively for you.
                </Typography>
                <Button
                  ripple={true}
                  onClick={() => {
                    navigate("/products");
                  }}
                  className="bg-[#033514] text-white py-[14px] px-[21px] gap-[10px] inline-flex "
                >
                  SHOP NOW
                </Button>
              </div>
            </div>

            {/* right */}
            {!isTabletOrMobile && (
              <div style={styles.right}>
                <div className="w-full max-w-[585px] h-full bg-white">
                  <img
                    src={HEATFREEHAIR}
                    className="w-full h-full bg-transparent"
                    alt="HEATFREEHAIR-FOR-COIL"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Slider>
    </div>
  );
}

export default HeroSection;

const styles = {
  container: tw`
  w-full px-0 mx-0 bg-white z-10
  `,
  innerContainer: tw`
  bg-white relative overflow-hidden bg-no-repeat w-full px-4  object-cover bg-cover mx-auto py-12 lg:pt-0 md:py-20 flex flex-row lg:flex-col gap-10 lg:h-screen items-center justify-center lg:justify-between`,
  left: tw`px-0 mx-0 w-full items-start  `,
  right: tw`px-0 mx-0 w-full items-center flex bg-white`,
};
