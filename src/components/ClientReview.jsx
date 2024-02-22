import React, { useState } from "react";
import tw from "twin.macro";
import { AiTwotoneStar } from "react-icons/ai";
import { useSnapCarousel } from "react-snap-carousel";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

const user = [
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    name: "Esther .N",
    work: "Entrepreneur",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    name: "Rasheedat .N",
    work: "Laugher",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud",
    name: "Lukurat .N",
    work: "Smiler",
  },
];

function ClientReview() {
  const { scrollRef, pages, goTo } = useSnapCarousel();

  const [isActive, setActive] = useState(0);

  const starAverage = 5;
  const fullStars = Math.floor(starAverage);

  const starArr = Array.from({ length: fullStars }, (_, i) => i + 1);

  if (starAverage < 5) {
    const partialStar = starAverage - fullStars;
    starArr.push(partialStar);
    const emptyStars = 5 - starArr.length;
    starArr.push(...Array.from({ length: emptyStars }, () => 0));
  }

  return (
    <div style={styles.container}>
      <div style={styles.body}>
        <div style={styles.innerWrapper}>
          <div className="flex flex-col items-center m-auto text-center mb-3">
            <h2 className="font-Montserrat font-bold text-[32px] mb-1 text-white ">
              Client Review
            </h2>
            <h3 className="font-Montserrat font-normal text-[15px] leading-[24px] mb-1 text-[#EDE1E1] ">
              What our client says about us.
            </h3>
          </div>

          <div style={styles.sliderBody}>
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
              {user.map((user, index) => (
                <div style={styles.scrollItem} key={index} onClick={() => {}}>
                  <div className="flex flex-col gap-8 items-center p-6 justify-center w-full  ">
                    <p className="font-Montserrat font-normal text-[15px] leading-[24px] items-end text-center racking-[0.2px] text-white ">
                      {user.description}
                    </p>

                    <div className="flex flex-col items-center">
                      <h2 className="font-Montserrat font-bold text-[24px] text-center text-white ">
                        {user.name}
                      </h2>
                      <span className="mb-4 font-Montserrat font-normal text-[15px] leading-[24px] items-end  tracking-[0.2px] text-[#EDE1E1] ">
                        {user.work}
                      </span>
                      <div style={styles.starContainer}>
                        {starArr.map((val, i) => (
                          <div key={i}>
                            <AiTwotoneStar />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -top-3 left-8 text-white ">
              <ImQuotesLeft size={28} />
            </div>
            <div className="absolute -bottom-3 right-8 text-white ">
              <ImQuotesRight size={28} />
            </div>
          </div>

          <div className="flex flex-wrap gap-6 items-center m-auto ">
            {pages.map((page, index) => (
              <button
                key={index}
                className="rounded-full "
                onClick={() => {
                  setActive(index);
                  goTo(index);
                }}
              >
                <img
                  src={`https://randomuser.me/api/portraits/women/${
                    index + 1
                  }.jpg`}
                  style={{
                    height: isActive === index ? "60px" : "40px",
                    width: isActive === index ? "60px" : "40px",
                  }}
                  alt={`user-${index}`}
                  className={`cursor-pointer transition duration-200 ease-in-out transform  rounded-full
                 h-${isActive === index ? "[15px]" : "[10px]"} 
                 w-${isActive === index ? "[15px]" : "[10px]"}  
                `}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClientReview;

const styles = {
  container: tw`flex bg-[#031E0C] flex-col gap-6 items-center w-full h-full m-auto py-14 px-6 md:px-20
  `,
  body: tw`flex items-center w-full h-full max-w-screen-2xl justify-center  m-auto`,
  innerWrapper: tw`flex flex-col gap-6 items-center w-full h-full m-auto py-14 px-6 md:px-20`,
  sliderBody: tw` flex w-full h-full max-w-[846px] items-center justify-center relative`,
  scrollItem: tw`bg-[#033514] items-center relative cursor-pointer w-full min-w-full h-full flex flex-col md:flex-row gap-3 py-6 px-6`,
  starContainer: tw` flex flex-row justify-between gap-1 items-center m-auto text-[#079627]`,
};
