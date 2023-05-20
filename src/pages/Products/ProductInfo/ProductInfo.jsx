import React, { useEffect, useState } from "react";
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
import DescriptionWigsBottom from "../../../components/DescriptionWigsBottom";
import Stack from "../../../components/Stack/Stack";
import Typography from "../../../components/Typography/Typography";
import { useParams } from "react-router";
import { getProduct, useGetProduct } from "../../../redux/product/productSlice";
import { useDispatch } from "react-redux";
import { addToCart, useGetCart } from "../../../redux/cart/cartSlice";
import { Circles } from "react-loader-spinner";

const SocialMediaLink = styled.a`
  ${tw`
hover:text-slate-500 
`}
`;
const ProductInfo = () => {
  const dispatch = useDispatch();
  const [inchesType, setInchesType] = useState("select");
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const singleProduct = useGetProduct();
  const cart = useGetCart();

  useEffect(async () => {
    await dispatch(getProduct(id));
  }, []);

  useEffect(async () => {
    await setProduct(singleProduct);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [singleProduct, id]);

  const isItemInCart = cart.some((cartItem) => cartItem.id === product?._id);

  // const isItemInCart = cart.find((cartItem) => cartItem.id === product._id);

  // console.log(isItemInCart);
  return (
    <>
      {product?.length < 1 || !product || isLoading ? (
        <div className="flex items-center justify-center m-auto py-6">
          {" "}
          <Circles color="#041706" height="100" width="100" visible />
        </div>
      ) : (
        <Stack
          direction="column"
          alignItems="start"
          justifyContent="start"
          className={"px-4 lg:px-14 py-10"}
        >
          <Stack
            alignItems="start"
            className=" flex-col md:flex-row gap-12 mb-10 "
          >
            {/* Left Row */}
            <Stack
              alignItems="start"
              direction="column"
              className={"gap-3 flex-wrap w-full max-w-[315px] "}
            >
              <div className="w-[315px] h-[346px] items-center  ">
                <img
                  src={product?.images[0]?.filePath}
                  alt="..."
                  className="w-full h-full"
                />
              </div>
              <Stack
                alignItems="start"
                justifyContent="start"
                direction="row"
                className={"gap-3 flex-wrap mb-2"}
              >
                <Button ripple={true} onClick={() => {}}>
                  <div className="w-[51px] h-[51px] items-center  ">
                    <img
                      src={product?.images[0]?.filePath}
                      alt="..."
                      className="w-full h-full"
                    />
                  </div>
                </Button>
                <Button ripple={true} onClick={() => {}}>
                  <div className="w-[51px] h-[51px] items-center  ">
                    <img
                      src={product?.images[0]?.filePath}
                      alt="..."
                      className="w-full h-full"
                    />
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
                {product?.title}
              </Typography>
              <div className="flex flex-wrap gap-3 items-center mb-2">
                <AiTwotoneStar size={10} />
                <Typography size="heading6" className=" text-[#F75E54] ">
                  {product?.ratings || product?.ratings !== null
                    ? product?.ratings?.length
                    : 0}{" "}
                  {}
                  Reviews
                </Typography>
              </div>
              <div className="flex flex-col p-1 gap-2 border-y border-solid border-y-[#D9D9D9] w-full max-w-[730px] text-start items-start ">
                <Typography variant="black" size="heading3">
                  # {product?.newPrice}
                </Typography>
                <span
                  style={{ textDecoration: "line-through" }}
                  className=" text-[#CFCFCF] text-center mb-1 text-[14px] leading-[16px] font-light font-Roboto   "
                >
                  # {product.oldPrice}
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
                  {inchesType} Inches
                </Typography>
              </div>

              <Stack
                direction="row"
                alignItems="start"
                justifyContent="start"
                className={"flex items-start  flex-wrap gap-2"}
              >
                {product?.categories &&
                  product?.categories.map((p) => (
                    <Button
                      ripple={true}
                      onClick={() => {
                        setInchesType(p);
                      }}
                    >
                      <div
                        style={{
                          border:
                            inchesType === p
                              ? "1px solid #000000"
                              : "0.75px solid #787878",
                          padding: "4px 14px",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "5px",
                        }}
                      >
                        <Typography variant="black" size="heading6">
                          {p} Inches
                        </Typography>
                      </div>
                    </Button>
                  ))}
              </Stack>

              <Typography variant="black" size="smallerText">
                - Shipping fee as it is charged based on the courier company
                handling your order.
              </Typography>

              <div className="flex flex-wrap gap-2 items-center">
                <Typography variant="black" size="lightText">
                  # {product?.newPrice}
                </Typography>
                <span
                  style={{ textDecoration: "line-through" }}
                  className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto   "
                >
                  # {product?.oldPrice}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 items-center ">
                {/*  */}
                {!isItemInCart ? (
                  <Button
                    ripple={true}
                    onClick={() => {
                      dispatch(addToCart({ id: product?._id, quantity: 1 }));
                    }}
                  >
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
                ) : (
                  <p className="notification  text-black  text-[14px] text-center leading-[16px] font-light font-Roboto ">
                    Item added to cart!
                  </p>
                )}

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
                      {quantity}
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
                SKU: {product?._id}
              </Typography>
            </Stack>
          </Stack>

          {/* This is the Tab that is at the bottom */}
          <DescriptionWigsBottom />
        </Stack>
      )}
    </>
  );
};

export default ProductInfo;
