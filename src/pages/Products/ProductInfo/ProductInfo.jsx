import React, { useEffect, useState } from "react";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
  useGetCart,
} from "../../../redux/cart/cartSlice";
import tw from "twin.macro";
import styled from "styled-components";
import { useParams } from "react-router";
import ImageZoom from "react-image-zooom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import CurrencyFormat from "react-currency-format";
import { InfinitySpin } from "react-loader-spinner";
import Stack from "../../../components/Stack/Stack";
import Button from "../../../components/Button/Button";
import StarRating from "../../../components/StarRating";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Typography from "../../../components/Typography/Typography";
import ProductInfoBottom from "../../../components/ProductInfobottom";
import ProductInfoShowPopup from "../../../components/ProductInfoShowPopup";
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from "react-icons/bs";
import { getProduct, useGetProduct } from "../../../redux/product/productSlice";



const SocialMediaLink = styled.a`
  ${tw`
hover:text-slate-500 
`}
`;
const ProductInfo = () => {
  const dispatch = useDispatch();
  const [inchesType, setInchesType] = useState("select");
  const [isActiveImage, setActiveImage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isStretchedLength, setIsStretchedLength] = useState(false);
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const singleProduct = useGetProduct();
  const navigate = useNavigate();
  const cart = useGetCart();
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 425px)" });

  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setProduct([]);
        await dispatch(getProduct(id));
      } catch (error) {
        // Handle errors
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, dispatch]);

  useEffect(() => {
    const updateProduct = async () => {
      try {
        await setProduct(singleProduct);
        setTimeout(() => {
          setIsLoading(false);
        }, 2000);
      } catch (error) {
        // Handle errors
      }
    };

    updateProduct();
  }, [singleProduct, id]);

  const isItemInCart = cart.some((cartItem) => cartItem.id === product?._id);

  const itemInCart = cart.find((cartItem) => cartItem.id === product?._id);

  console.log(product);
  return (
    <div className="w-full">
      {product?.length < 1 || !product || isLoading ? (
        <div className="flex items-center justify-center m-auto py-6">
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />{" "}
        </div>
      ) : (
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={"px-4 lg:px-14 py-10"}
        >
          <ProductInfoShowPopup
            title={product?.title}
            inchesType={inchesType}
            isItemInCart={isItemInCart}
          />
          <Stack className=" flex-col items-center lg:items-baseline justify-center lg:justify-between lg:flex-row  mt-0 gap-12 mb-10 ">
            {/* Left Row */}
            <div className="flex h-full flex-col items-center justify-center lg:items-start lg:justify-start lg:flex-row-reverse gap-6 w-full">
              <ImageZoom
                height="100%"
                zoom="200"
                alt={product?.title}
                width={isMobile ? "100%" : "423px"}
                src={product?.images[isActiveImage]?.filePath}
              />
              <div className={"flex  gap-3 lg:flex-col mb-2"}>
                {product?.images.map((image, index) => (
                  <div key={image._id}>
                    <Button
                      ripple={true}
                      onClick={() => {
                        setActiveImage(index);
                      }}
                    >
                      <div className="w-[76px] h-full items-center  ">
                        <img
                          src={image?.filePath}
                          alt="..."
                          className="w-full h-full"
                        />
                      </div>
                    </Button>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Row */}
            <Stack
              direction="column"
              justifyContent="start"
              alignItems="start"
              className={"gap-4"}
            >
              <div className="flex flex-col items-start gap-[2px] ">
                <Typography
                  variant="black"
                  className={"text-[42px]  font-Poppins font-[500] "}
                >
                  {product?.title}
                </Typography>

                <CurrencyFormat
                  value={product?.newPrice}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"#"}
                  renderText={(value) => (
                    <Typography
                      variant="black"
                      className={"font-Poppins text-[24px] font-[500]  "}
                    >
                      {value}
                    </Typography>
                  )}
                />
              </div>
              <StarRating rating={product?.ratings} />
              <div className="flex flex-col p-1 gap-2 w-full max-w-[730px] text-start items-start ">
                <Stack
                  direction="row"
                  alignItems="start"
                  justifyContent="start"
                  className={"flex items-start  flex-wrap gap-2"}
                >
                  {product?.categories &&
                    product?.categories.map((p, index) => (
                      <div key={index}>
                        <Button
                          ripple={true}
                          onClick={() => {
                            setInchesType(p);
                            setIsStretchedLength(true);
                          }}
                          style={{
                            border:
                              inchesType === p
                                ? "none"
                                : "0.75px solid #787878",
                            backgroundColor:
                              inchesType === p ? "#D2E9D7" : "#fff",
                            padding: "10px 14px",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "5px",
                          }}
                        >
                          <div>Stretched Length: {p} Inches</div>
                        </Button>
                      </div>
                    ))}
                </Stack>
              </div>

              {/* <Typography variant="black" size="smallerText">
                - Shipping fee as it is charged based on the courier company
                handling your order.
              </Typography> */}

              {/* <div className="flex flex-wrap gap-2 items-center">
                <Typography variant="black" size="lightText">
                  # {product?.newPrice}
                </Typography>
                <span
                  style={{ textDecoration: "line-through" }}
                  className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto   "
                >
                  # {product?.oldPrice}
                </span>
              </div> */}

              <div className="flex  w-full flex-wrap gap-2 items-center ">
                {/*  */}
                {isStretchedLength ? (
                  <>
                    {!isItemInCart ? (
                      <Button
                        ripple={true}
                        onClick={() => {
                          dispatch(
                            addToCart({
                              id: product?._id,
                              quantity: 1,
                              item: product,
                              stretchedLength: inchesType,
                            })
                          );
                        }}
                      >
                        <div
                          style={{
                            border: "1px solid #000",
                            padding: "16px 30px",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "15px",
                            background: "transparent",
                          }}
                        >
                          <Typography variant="black" size="heading6">
                            Add to cart
                          </Typography>
                        </div>
                      </Button>
                    ) : (
                      <p className="notification  text-black  text-[14px] text-center leading-[16px] font-light font-Roboto ">
                        Item added to cart!
                      </p>
                    )}
                  </>
                ) : (
                  <p className="notification  text-black  text-[14px] text-center leading-[16px] font-light font-Roboto ">
                    Select Stretched Length!
                  </p>
                )}

                {/*  */}
                {isItemInCart && (
                  <Button
                    ripple={true}
                    onClick={() => {
                      navigate(`/checkout`);
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid #000",
                        padding: "16px 30px",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "15px",
                        background: "transparent",
                      }}
                    >
                      <Typography variant="black" size="heading6">
                        Buy Now
                      </Typography>
                    </div>
                  </Button>
                )}

                {/* increament and decreament button */}
                {isItemInCart && (
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
                      <Button
                        ripple={true}
                        onClick={() => {
                          dispatch(decrementQuantity(itemInCart?.id));
                        }}
                      >
                        <AiOutlineMinus size={12} color="#000000" />
                      </Button>

                      <Typography variant="black" size="heading6">
                        {itemInCart?.quantity ? itemInCart?.quantity : 1}
                      </Typography>
                      <Button
                        ripple={true}
                        onClick={() => {
                          dispatch(incrementQuantity(itemInCart?.id));
                        }}
                      >
                        <AiOutlinePlus size={12} color="#000000" />
                      </Button>
                    </div>
                  </div>
                )}

                {/*  */}
                {/* <AiOutlineHeart size={20} color="#000000" /> */}
              </div>

              <div className="flex flex-col w-full gap-4 py-10 border-t border-t-[#D9D9D9] items-start mt-4">
                <div className="w-full flex gap-6 items-start">
                  <div className="flex justify-between gap-4 w-[100px] ">
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      SKU
                    </Typography>
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      :
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      {product?._id}
                    </Typography>
                  </div>
                </div>

                <div className="w-full flex gap-6 items-start">
                  <div className="flex justify-between gap-4 w-[100px] ">
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      Category
                    </Typography>
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      :
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      {product?.collections}
                    </Typography>
                  </div>
                </div>

                <div className="w-full flex gap-6 items-start">
                  <div className="flex justify-between gap-4 w-[100px] ">
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      Tags
                    </Typography>
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      :
                    </Typography>
                  </div>
                  <div>
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      {product?.collections}
                    </Typography>
                  </div>
                </div>

                <div className="w-full flex gap-6 items-start">
                  <div className="flex justify-between gap-4 w-[100px] ">
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      Share
                    </Typography>
                    <Typography
                      className={
                        "text-[16px] text-[#9F9F9F] font-[400] font-Poppins  "
                      }
                    >
                      :
                    </Typography>
                  </div>
                  <div className="flex flex-row gap-3 items-center">
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
              </div>
            </Stack>
          </Stack>

          {/* This is the Tab that is at the bottom */}
          <ProductInfoBottom product={product} />
        </Stack>
      )}
    </div>
  );
};

export default ProductInfo;
