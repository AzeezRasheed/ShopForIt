import React, { useEffect, useState } from "react";
import { BiChevronRight, BiChevronLeft } from "react-icons/bi";
import Collection2 from "../assets/Collection2.png";
import { useSnapCarousel } from "react-snap-carousel";
import styled from "styled-components";
import tw from "twin.macro";
import { useGetProducts } from "../redux/product/productSlice";
import { useDispatch } from "react-redux";
import { addToCart, useGetCart } from "../redux/cart/cartSlice";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router";

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
  w-[185px]  h-full max-h-[209px] items-center

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

function EasterSales() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const navigate = useNavigate();

  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();

  const products = useGetProducts();
  const cart = useGetCart();

  const event = "Easter Sunday";
  useEffect(() => {
    const filteredCollection = products.filter(
      (product) =>
        product?.event &&
        product.event.toLowerCase().includes(event.toLowerCase())
    );
    setFilteredProduct(filteredCollection);
    if (filteredProduct) {
      setIsLoading(false);
    }
    return filteredCollection;
  }, [products]);
  console.log({ filteredProduct });

  return (
    <Container>
      <InnerWrapper>
        <Header>Easter Sales</Header>
        {filteredProduct.length > 0 && (
          <ButtonWrapper>
            <button onClick={() => prev()}>
              <BiChevronLeft />
            </button>
            <button onClick={() => next()}>
              <BiChevronRight />
            </button>
          </ButtonWrapper>
        )}
      </InnerWrapper>

      {filteredProduct.length > 0 && (
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
            {isLoading ? (
              <div className="items-center text-center m-auto flex justify-center ">
                <Circles color="#FFFFFF" height="100" width="100" visible />
              </div>
            ) : (
              <>
                {filteredProduct.map((item, index) => {
                  const isItemInCart = cart.some(
                    (cartItem) => cartItem.id === item._id
                  );
                  return (
                    <ScrollItem key={index} onClick={() => {}}>
                      <Image src={item?.images[0]?.filePath} alt="..." />

                      <div className="flex flex-col gap-2 text-start items-start ">
                        <Title>{item?.title}</Title>
                        <Reviews>{item?.ratings.length} Reviews</Reviews>
                        <Description>
                          {item?.descriptions[0]?.value}
                        </Description>
                        <div className="flex flex-col items-start">
                          <OldPrice style={{ textDecoration: "line-through" }}>
                            #{item?.oldPrice}
                          </OldPrice>
                          <CurrentPrice>#{item?.newPrice}</CurrentPrice>
                        </div>
                        <div className="flex gap-3 items-center">
                          <OrderNow
                            onClick={() => {
                              navigate(`/products/info/${item?._id}`);
                            }}
                          >
                            ORDER NOW
                          </OrderNow>
                          {!isItemInCart ? (
                            <AddToCart
                              onClick={() => {
                                dispatch(
                                  addToCart({ id: item._id, quantity: 1 })
                                );
                              }}
                            >
                              ADD TO CART
                            </AddToCart>
                          ) : (
                            <p className="notification  text-white  text-[14px] text-center leading-[16px] font-light font-Roboto ">
                              Item added to cart!
                            </p>
                          )}
                        </div>
                      </div>
                    </ScrollItem>
                  );
                })}
              </>
            )}
          </div>
        </SliderContainer>
      )}
    </Container>
  );
}

export default EasterSales;
