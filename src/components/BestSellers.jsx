import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import { Typography } from "@mui/material";
import { useGetProducts } from "../redux/product/productSlice";
import { ColorRing, InfinitySpin } from "react-loader-spinner";
import Button from "./Button/Button";
import { addToCart, useGetCart } from "../redux/cart/cartSlice";
import { useDispatch } from "react-redux";

const BestSellers = () => {
  const cart = useGetCart();
  const dispatch = useDispatch();
  const products = useGetProducts();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (products.length > 0) {
      setIsLoading(false);
    }
  }, [products]);

  const slicedData = products.slice(0, 4);

  return (
    <div style={styles.container}>
      {/* top */}
      <div style={styles.textContainer}>
        <Typography
          variant="white"
          className={
            "md:text-[40px] text-[25px] font-normal capitalize font-Artifika leading-tight  "
          }
        >
          Best Sellers
        </Typography>
      </div>

      {products?.length < 1 || !products ? (
        <div className="flex items-center justify-center m-auto py-6">
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        <>
          {/* bottom */}
          {products?.length < 1 ||
            !products ||
            (isLoading ? (
              <div className="flex items-center justify-center m-auto py-6">
                <ColorRing
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            ) : (
              <div className="flex flex-wrap items-center m-auto gap-4 w-full">
                {slicedData.map((product, index) => {
                  const getCollectionInfo = (collectionType) => {
                    let title = "";
                    let description = "";

                    switch (collectionType) {
                      case "Wigs":
                        title = "for Wigs";
                        description = "for Wigs Lace Front";
                        break;
                      case "Extensions":
                        title = "for Extensions";
                        description = "for Extensions Lace Front";
                        break;
                      default:
                        title = "for Accessories";
                        description = "for Accessories Lace Front";
                        break;
                    }

                    return { title, description };
                  };

                  const { title, description } = getCollectionInfo(
                    product?.collections
                  );

                  const isItemInCart = cart.some(
                    (cartItem) => cartItem.id === product?._id
                  );

                  console.log(isItemInCart);

                  return (
                    <div className="flex flex-col w-full max-w-[234px] items-center text-center m-auto flex-wrap">
                      <Typography
                        className={
                          " text-[#5B5959] text-[32px] font-normal lowercase font-BeauRivage leading-tight mb-5  "
                        }
                      >
                        {title}
                      </Typography>
                      {/*  */}
                      <div className="flex flex-col items-center gap-3">
                        {product?.images && (
                          <div className="w-[232px] h-full bg-white">
                            <img
                              src={product?.images[0]?.filePath}
                              // src={HeatFreeHair}
                              className="w-full h-full bg-transparent"
                              alt={product?.title}
                            />
                          </div>
                        )}

                        <Typography
                          size="heading6Bold"
                          className={"text-[#221F1F] font-[600] "}
                        >
                          {description}
                        </Typography>

                        {/* button and text */}
                        <div style={styles.container}>
                          {!isItemInCart ? (
                            <Button
                              ripple={true}
                              onClick={() => {
                                dispatch(
                                  addToCart({
                                    id: product?._id,
                                    quantity: 1,
                                    item: product,
                                  })
                                );

                                console.log("object added to cart", product);
                              }}
                              className="bg-[#033514] text-white py-[14px] px-[21px] gap-[10px] inline-flex "
                            >
                              ADD TO CART
                            </Button>
                          ) : (
                            <p className="notification  text-black  text-[14px] text-center leading-[16px] font-light font-Roboto ">
                              Item added to cart!
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default BestSellers;

const styles = {
  container: tw`flex flex-col w-full items-center text-center m-auto bg-[#fff] gap-5 px-4 py-10 `,
  textContainer: tw`flex flex-col items-center m-auto  gap-4 `,
};
