import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";
import Stack from "../../components/Stack/Stack";
import Typography from "../../components/Typography/Typography";
import CurrencyFormat from "react-currency-format";
import { useGetCart } from "../../redux/cart/cartSlice";
import CartsTable from "../../components/CartsTable";
import Button from "../../components/Button/Button";
import { calculateSubtotal } from "../../components/CalculateSubtotal";
import Context from "../../context/ContextProvider";
// import { Context } from "./ContextProvider";

const Carts = () => {
  useEffect(() => {
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const navigate = useNavigate();

  const cart = useGetCart();
  const [shippingAmount, setShippingAmount] = useState(2000);
  const { shippingLocation, setShippingLocation } = useContext(Context);

  const subtotal = calculateSubtotal(cart);

  useEffect(() => {
    switch (shippingLocation) {
      case "lekki":
        setShippingAmount(2000);
        break;
      default:
        setShippingAmount(2500);
    }
  }, [shippingLocation]);

  return (
    <Stack
      direction="column"
      alignItems="center"
      className={"mt-6 px-0 lg:px-12"}
    >
      <div className="flex flex-col items-center text-center mb-10">
        <h2 className="text-[28px] font-[500] leading-[130%] mb-1 uppercase font-OpenSans text-[#000] ">
          Cart
        </h2>

        <Breadcrumb />
      </div>

      <Stack
        direction="column"
        alignItems="center"
        className={"flex lg:flex-row md:items-start gap-6  px-4"}
      >
        {/* Left */}
        <div className="w-full">
          <CartsTable />
        </div>

        {/* Right */}

        <Stack
          direction="column"
          alignItems="center"
          className={"w-full max-w-[350px] gap-6 "}
        >
          {/* top for product and subtotal */}
          <Stack
            direction="column"
            alignItems="center"
            className={"w-full  gap-[25px] border-b border-b-[#D9D9D9] pb-6 "}
          >
            <Stack
              alignItems="center"
              direction="row"
              justifyContent="start"
              className={"w-full gap-[20px] "}
            >
              <Typography size="heading4" variant="black">
                Cart Totals
              </Typography>
            </Stack>

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="spacebetween"
              className={"w-full gap-[20px] "}
            >
              <Typography size="heading6" variant="black">
                Subtotal
              </Typography>

              <CurrencyFormat
                value={subtotal}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"#"}
                renderText={(value) => (
                  <span className=" text-[#000000] text-[18px] leading-[160%] font-normal font-Roboto ">
                    {value}
                  </span>
                )}
              />
            </Stack>

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="spacebetween"
              className={"w-full gap-[20px] "}
            >
              <Typography size="heading6" variant="black">
                Shipping
              </Typography>

              <div className="flex flex-col  gap-4 items-end ">
                <div className="flex flex-col  gap-3 items-end ">
                  <div className="flex flex-row  gap-2 items-end ">
                    <input
                      type="checkbox"
                      checked={shippingLocation === "lekki" ? true : false}
                      onChange={() => {
                        setShippingLocation("lekki");
                      }}
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                    />
                    <Typography size="heading6" variant="black">
                      Lekki/Ajah:
                    </Typography>
                  </div>
                  <CurrencyFormat
                    value={"2500"}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"#"}
                    renderText={(value) => (
                      <span className=" text-[#000000] text-[18px] leading-[160%] font-normal font-Roboto ">
                        {value}
                      </span>
                    )}
                  />
                </div>
                <div className="flex flex-col  gap-3 items-end ">
                  <div className="flex flex-row  gap-2 items-end ">
                    <input
                      type="checkbox"
                      checked={shippingLocation === "mainland" ? true : false}
                      onChange={() => {
                        setShippingLocation("mainland");
                      }}
                      className="form-checkbox h-5 w-5 text-indigo-600 transition duration-150 ease-in-out"
                    />

                    <Typography size="heading6" variant="black">
                      Mainland:
                    </Typography>
                  </div>
                  <CurrencyFormat
                    value={"2000"}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"#"}
                    renderText={(value) => (
                      <span className=" text-[#000000] text-[18px] leading-[160%] font-normal font-Roboto ">
                        {value}
                      </span>
                    )}
                  />
                </div>
              </div>
            </Stack>

            <Stack
              alignItems="center"
              direction="row"
              justifyContent="spacebetween"
              className={"w-full gap-[20px] "}
            >
              <Typography size="heading6" variant="black">
                Total
              </Typography>

              <CurrencyFormat
                value={subtotal + shippingAmount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"#"}
                renderText={(value) => (
                  <span className=" text-[#000000] text-[18px] leading-[160%] font-normal font-Roboto ">
                    {value}
                  </span>
                )}
              />
            </Stack>
          </Stack>

          {/* bottom */}
          {/* Proceed To Checkout button */}
          <Button
            ripple
            onClick={() => {
              navigate("/checkout");
            }}
            className="w-full  "
          >
            <div
              className={`py-4 px-6 w-full  bg-[${"#033514"}]  rounded-[5px] items-center text-center`}
            >
              <Typography variant={"white"} size="buttons">
                Proceed To Checkout
              </Typography>
            </div>
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Carts;
