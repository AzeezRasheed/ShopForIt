import React from "react";
import Stack from "./Stack/Stack";
import Typography from "./Typography/Typography";
import Collection1 from "../assets/Collection1.png";
import { GiCancel } from "react-icons/gi";
import Button from "./Button/Button";
import shoppingCartData from "../data/shoppingCart";
import { removeItem, useGetCart } from "../redux/cart/cartSlice";
import { useGetProducts } from "../redux/product/productSlice";
import { useDispatch } from "react-redux";

const DrawerRight = () => {
  const dispatch = useDispatch();
  const cart = useGetCart();
  const cartTotal = cart.length;
  const items = useGetProducts();
  return (
    <Stack
      direction="column"
      alignItems="center"
      className={"gap-4 w-[360px] md:w-[433px] py-10 px-12"}
    >
      <Typography size="heading3" variant="black">
        Shopping Cart ({cartTotal})
      </Typography>

      <Stack direction="column" alignItems="center" className={"gap-4"}>
        {cartTotal > 0 ? (
          <>
            {cart.map((data, index) => {
              const item = items.find((item) => item._id === data.id);
              if (item) {
                return (
                  <div key={data.id} className="w-full">
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="spacebetween"
                      className={"p-4 border-y border-y-[#A7A7A7] "}
                    >
                      <div className="flex flex-wrap gap-3">
                        <div
                          style={{
                            padding: "4px",
                            border: "1px solid #EDE1E1",
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "6px",
                            position: "relative",
                          }}
                        >
                          <div className="w-[72.69px] h-[71.14px] items-center  ">
                            <img
                              src={item?.images[0]?.filePath}
                              alt="..."
                              className="w-full h-full"
                            />
                          </div>
                        </div>
                        {/*  */}
                        <div className="flex flex-col text-start items-start gap-2">
                          <h2 className="font-medium text-[11px] leading-[130%] text-center text-[#000000] font-Montserrat ">
                            {item?.title}
                          </h2>
                          <span className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto  ">
                            # {item?.newPrice}
                          </span>
                          <div className="flex flex-row gap-2 items-center ">
                            <span className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto   ">
                              Qty:
                            </span>
                            <div className="py-0.5 px-3 border border-[#C0C0C0] text-center ">
                              <span className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto   ">
                                {data?.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button
                        ripple
                        onClick={() => {
                          dispatch(removeItem(item._id));
                        }}
                      >
                        <GiCancel
                          className="cursor-pointer"
                          color="#C0C0C0"
                          size={20}
                        />
                      </Button>
                    </Stack>
                  </div>
                );
              }
            })}
          </>
        ) : (
          <span className=" text-[#000000] text-center text-[16px] leading-[130%] font-semibold font-Roboto   ">
            You have no items in your shopping cart.
          </span>
        )}
      </Stack>
      {cartTotal > 0 && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="spacebetween"
            className={"flex-wrap gap-2"}
          >
            <span className=" text-[#000000] text-center text-[14px] leading-[16px] font-light font-Roboto   ">
              Cart Subtotal:
            </span>

            <span className=" text-[#000000] text-center text-[18px] leading-[160%] font-bold font-Roboto   ">
              #6900
            </span>
          </Stack>
        </>
      )}

      {cartTotal > 0 && (
        <Button ripple className="w-[343px]">
          <div className="px-[20px] py-4 w-full bg-[#033514] rounded-[5px] items-center text-center ">
            <Typography variant="white" size="buttons">
              Proceed to Checkout
            </Typography>
          </div>
        </Button>
      )}

      {cartTotal > 0 && (
        <h2 className="font-medium text-[11px] leading-[130%] text-center text-[#000000] font-Montserrat ">
          View and Edit Cart
        </h2>
      )}
    </Stack>
  );
};

export default DrawerRight;
