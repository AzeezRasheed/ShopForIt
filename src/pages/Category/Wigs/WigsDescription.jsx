import React, { useState } from "react";
import Collection1 from "../../../assets/Collection1.png";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiOutlineMinus,
  AiOutlinePlus,
  AiTwotoneStar,
} from "react-icons/ai";
import Button from "../../../components/Button/Button";
import tw from "twin.macro";
import styled from "styled-components";
import DescriptionWigsBottom from "../../../components/ProductInfobottom";
import Stack from "../../../components/Stack/Stack";
import Typography from "../../../components/Typography/Typography";

const SocialMediaLink = styled.a`
  ${tw`
hover:text-slate-500 
`}
`;
const WigsDescription = () => {
  const [inchesType, setInchesType] = useState("");
  return (
    <Stack
      direction="column"
      alignItems="start"
      justifyContent="start"
      className={"px-4 lg:px-14 py-10"}
    >
      <Stack alignItems="start" className=" flex-col md:flex-row gap-12 mb-10 ">
        {/* Left Row */}
        <Stack
          alignItems="start"
          direction="column"
          className={"gap-3 flex-wrap w-full max-w-[315px] "}
        >
          <div className="w-[315px] h-[346px] items-center  ">
            <img src={Collection1} alt="..." className="w-full h-full" />
          </div>
          <Stack
            alignItems="start"
            justifyContent="start"
            direction="row"
            className={"gap-3 flex-wrap mb-2"}
          >
            <Button ripple={true} onClick={() => {}}>
              <div className="w-[51px] h-[51px] items-center  ">
                <img src={Collection1} alt="..." className="w-full h-full" />
              </div>
            </Button>
            <Button ripple={true} onClick={() => {}}>
              <div className="w-[51px] h-[51px] items-center  ">
                <img src={Collection1} alt="..." className="w-full h-full" />
              </div>
            </Button>
          </Stack>
          <div className="w-full max-w-[313px] h-0 border border-solid border-[#D9D9D9] "></div>
          <div className="flex flex-col text-start items-start gap-2 ">
            <Typography variant="black" size="heading6">
              SHARE THIS PRODUCT
            </Typography>

            <div className="flex space-x-6 sm:justify-center mb-4 md:mb-0">
              <SocialMediaLink href="/">
                <BsInstagram size={20} />
                <span className="sr-only">Instagram page</span>
              </SocialMediaLink>
              <SocialMediaLink href="/">
                <BsTwitter size={20} />
                <span className="sr-only">Twitter page</span>
              </SocialMediaLink>
              <SocialMediaLink href="/">
                <BsFacebook size={20} />
                <span className="sr-only">Facebook page</span>
              </SocialMediaLink>
              <SocialMediaLink href="/">
                <BsYoutube size={20} />
                <span className="sr-only">Youtube account</span>
              </SocialMediaLink>
            </div>
          </div>
        </Stack>

        {/* Right Row */}
        <Stack
          direction="column"
          justifyContent="start"
          alignItems="start"
          className={"gap-4"}
        >
          <Typography variant="black" size="heading3">
            Test
          </Typography>
          <div className="flex flex-wrap gap-3 items-center mb-2">
            <AiTwotoneStar size={10} />
            <Typography size="heading6" className=" text-[#F75E54] ">
              4 Reviews
            </Typography>
          </div>
          <div className="flex flex-col p-1 gap-2 border-y border-solid border-y-[#D9D9D9] w-full max-w-[730px] text-start items-start ">
            <Typography variant="black" size="heading3">
              # 50000
            </Typography>
            <span
              style={{ textDecoration: "line-through" }}
              className=" text-[#CFCFCF] text-center mb-1 text-[14px] leading-[16px] font-light font-Roboto   "
            >
              #30000{" "}
              <span className="p-1 ml-2 text-[#F7A054] bg-[#FFECDB]  ">
                -49%
              </span>
            </span>
          </div>

          <div className="flex flex-wrap gap-2 items-center text-center">
            <Typography variant="black" size="bodyLarge">
              Stretched Length:
            </Typography>
            <Typography variant="black" size="heading5">
              {inchesType}
            </Typography>
          </div>

          <Stack
            direction="row"
            alignItems="start"
            justifyContent="start"
            className={"flex items-start  flex-wrap gap-2"}
          >
            <Button
              ripple={true}
              onClick={() => {
                setInchesType("18 Inches");
              }}
            >
              <div
                style={{
                  border:
                    inchesType === "18 Inches"
                      ? "1px solid #000000"
                      : "0.75px solid #787878",
                  padding: "4px 14px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="black" size="heading6">
                  18 Inches
                </Typography>
              </div>
            </Button>
            <Button
              ripple={true}
              onClick={() => {
                setInchesType("20 Inches");
              }}
            >
              <div
                style={{
                  border:
                    inchesType === "20 Inches"
                      ? "1px solid #000000"
                      : "0.75px solid #787878",
                  padding: "4px 14px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                }}
              >
                <Typography variant="black" size="heading6">
                  20 Inches
                </Typography>
              </div>
            </Button>
          </Stack>

          <Typography variant="black" size="smallerText">
            - Shipping fee as it is charged based on the courier company
            handling your order.
          </Typography>

          <div className="flex flex-wrap gap-2 items-center">
            <Typography variant="black" size="lightText">
              # 300
            </Typography>
            <span
              style={{ textDecoration: "line-through" }}
              className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto   "
            >
              # 500
            </span>
          </div>

          <div className="flex flex-wrap gap-2 items-center ">
            {/*  */}
            <Button ripple={true} onClick={() => {}}>
              <div
                style={{
                  border: "1px solid #C0C0C0",
                  padding: "12px 14px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                  backgroundColor: "#033514",
                }}
              >
                <Typography variant="white" size="heading6">
                  Add to cart
                </Typography>
              </div>
            </Button>

            {/*  */}
            <Button ripple={true} onClick={() => {}}>
              <div
                style={{
                  border: "1px solid #C0C0C0",
                  padding: "12px 14px",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "5px",
                  backgroundColor: "#262626",
                }}
              >
                <Typography variant="white" size="heading6">
                  Buy Now
                </Typography>
              </div>
            </Button>

            {/*  */}
            <div
              style={{
                border: "1px solid #C0C0C0",
                padding: "12px 14px",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "5px",
              }}
            >
              <div className="flex flex-wrap gap-2 items-center">
                <Button ripple={true} onClick={() => {}}>
                  <AiOutlineMinus size={12} color="#000000" />
                </Button>

                <Typography variant="black" size="heading6">
                  1
                </Typography>
                <Button ripple={true} onClick={() => {}}>
                  <AiOutlinePlus size={12} color="#000000" />
                </Button>
              </div>
            </div>

            {/*  */}
            <AiOutlineHeart size={20} color="#000000" />
          </div>

          <Typography variant="black" size="smallerText">
            SKU: 148242889012887_315405229
          </Typography>
        </Stack>
      </Stack>

      {/* This is the Tab that is at the bottom */}
      <DescriptionWigsBottom />
    </Stack>
  );
};

export default WigsDescription;
