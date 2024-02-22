import React, { useEffect, useState } from "react";
import Stack from "../../components/Stack/Stack";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { FaStarOfLife } from "react-icons/fa";
import { Field, Formik, useFormik } from "formik";
import { FormControl } from "@mui/material";
import { City, Country, State } from "country-state-city";
import Select from "react-select";
import BillingValidationSchema from "../../utils/YupSchemaValidation/BillingDetails";
import { usePaystackPayment } from "react-paystack";

import { useGetCart } from "../../redux/cart/cartSlice";
import { toast } from "react-toastify";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";
import { SET_BILLING_DETAILS } from "../../redux/order/orderSlice";
import { useDispatch } from "react-redux";
import CurrencyFormat from "react-currency-format";
import { calculateSubtotal } from "../../components/CalculateSubtotal";
import Breadcrumb from "../../components/BreadCrumb";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useGetCart();
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [products, setProducts] = useState([]);
  const [shippingLocation, setshippingLocation] = useState("lekki");
  const [shippingAmount, setShippingAmount] = useState(2000);
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);

  const initialValues = {
    firstname: "",
    lastname: "",
    email: "",
    address: "",
    country: "",
    state: null,
    city: null,
    tel_whatsapp: "",
    orderNotes: "",
    shippingLocation: shippingLocation,
  };

  const cartItems = useGetCart();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const onSubmit = (values, actions) => {
    console.log(values);
    // actions.reset();
  };

  const {
    values,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: BillingValidationSchema,
    onSubmit,
  });

  useEffect(() => {
    const fetchedProducts = async () => {
      const fetchedProducts = [];

      const getProduct = async (id) => {
        try {
          const response = await axios.get(
            `${BACKEND_URL}/api/v1/products/${id}`
          );
          return response.data;
        } catch (error) {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          toast.error(message);
        }
      };

      try {
        for (const cartItem of cartItems) {
          const product = await getProduct(cartItem.id);
          fetchedProducts.push({
            ...product,
            quantity: cartItem.quantity,
            stretchedLength: cartItem.stretchedLength,
          });
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }

      // console.log("Fetched products:", fetchedProducts);
      setProducts(fetchedProducts);
    };
    fetchedProducts();
  }, [cartItems, BACKEND_URL, values.country, values.city]);

  const countries = Country.getAllCountries();
  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));

  useEffect(() => {
    if (values.country) {
      const states = State.getStatesOfCountry(values.country).map((state) => ({
        label: state.name,
        value: state.name,
        ...state,
      }));
      setStates(states);
      setFieldValue("state", null);
      setFieldValue("city", null);
    }
  }, [values.country, setFieldValue]);

  useEffect(() => {
    if (values.state) {
      const cities = City.getCitiesOfState(values.country, values.state).map(
        (city) => ({
          label: city.name,
          value: city.name,
          ...city,
        })
      );
      setCities(cities);
      // setFieldValue("city", null);
    }
  }, [values.state, values.country, values.city, setFieldValue]);

  useEffect(() => {
    if (
      values.email &&
      values.firstname &&
      values.lastname &&
      values.country &&
      values.state &&
      values.city &&
      values.address &&
      values.tel_whatsapp
    ) {
      setIsPlaceOrder(true);
    }
  }, [
    values.email,
    values.firstname,
    values.lastname,
    values.country,
    values.address,
    values.tel_whatsapp,
    values.city,
    values.state,
  ]);

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

  console.log(values);

  const config = {
    email: values.email,
    amount: subtotal * 100,
    publicKey: "pk_test_8b9d1580e9c636b7047e9ec9bee4a72db95eba70",
    metadata: {
      name: `${values.firstname} ${values.lastname}`,
      phone: values.tel_whatsapp,
    },
  };

  const onSuccess = (response) => {
    toast.success("Payment successfully completed");
    console.log("from paystack", response);
    navigate("/payment/success");
    // const dataToSend = {
    //   paymentData: response,
    //   userInfo: initialValues,
    // };

    // Make a POST request to your backend endpoint
    // axios.post("/api/payment/success", dataToSend)
    //   .then((response) => {
    //     console.log("Payment data sent successfully:", response.data);
    //     // You can perform any additional actions here, such as showing a success message
    //   })
    //   .catch((error) => {
    //     console.error("Error sending payment data:", error);
    //     // Handle errors, show error message, etc.
    //   });
  };

  const onClose = () => {
    toast.error("Your payment was unsuccessful, try again later!");
  };

  const initializePayment = usePaystackPayment({
    ...config,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Formik initialValues={initialValues}>
        <Stack
          direction="column"
          alignItems="center"
          className="gap-3 px-4 lg:px-14 py-8   "
        >
          <div className="flex flex-col items-center text-center mb-10">
            <h2 className="text-[28px] font-[500] leading-[130%] mb-1 uppercase font-OpenSans text-[#000] ">
              Checkout
            </h2>
            <Breadcrumb />
          </div>
          <Stack
            justifyContent="center"
            alignItems="start"
            className={
              "gap-16 mt-10 grid grid-cols-1 md:grid-cols-2 max-w-[1116px] "
            }
          >
            {/* Left */}
            <div className="gap-2 flex flex-col items-start text-start justify-start w-full  ">
              {/* firstname */}
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="spacebetween"
                className="gap-2 flex-wrap   "
              >
                <div className="flex flex-row gap-1 items-center text-start ">
                  <Typography size="cardLabel" variant="label">
                    Firstname
                  </Typography>
                  {touched.firstname && errors.firstname && (
                    <FaStarOfLife color="#F75E54" size={8} />
                  )}
                </div>
                <Stack alignItems="start" direction="column">
                  <Field
                    className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full     "
                    name={`firstname`}
                    value={values.firstname}
                    onChange={handleChange}
                    error={touched.firstname && Boolean(errors.firstname)}
                    onBlur={handleBlur}
                    //   placeholder={``}
                  />
                  {touched.firstname && errors.firstname ? (
                    <Typography as={"span"} className="text-sm text-[#F75E54]">
                      {errors.firstname}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>

              {/* lastname */}
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="spacebetween"
                className="gap-2 flex-wrap   "
              >
                <div className="flex flex-row gap-1 items-center text-start ">
                  <Typography size="cardLabel" variant="label">
                    Lastname
                  </Typography>
                  {touched.lastname && errors.lastname && (
                    <FaStarOfLife color="#F75E54" size={8} />
                  )}
                </div>
                <Stack alignItems="start" direction="column">
                  <Field
                    className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full     "
                    name={`lastname`}
                    value={values.lastname}
                    onChange={handleChange}
                    error={touched.lastname && Boolean(errors.lastname)}
                    onBlur={handleBlur}
                    //   placeholder={``}
                  />
                  {touched.lastname && errors.lastname ? (
                    <Typography as={"span"} className="text-sm text-[#F75E54]">
                      {errors.lastname}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>

              {/* email */}
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="spacebetween"
                className="gap-2 flex-wrap   "
              >
                <div className="flex flex-row gap-1 items-center text-start ">
                  <Typography size="cardLabel" variant="label">
                    Email Address
                  </Typography>
                  {touched.email && errors.email && (
                    <FaStarOfLife color="#F75E54" size={8} />
                  )}
                </div>
                <Stack alignItems="start" direction="column">
                  <Field
                    className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full    "
                    name={`email`}
                    value={values.email}
                    onChange={handleChange}
                    error={touched.email && Boolean(errors.email)}
                    onBlur={handleBlur}
                    //   placeholder={``}
                  />
                  {/* <div className="flex flex-row items-center text-start ">
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <h2 className="font-normal text-[11px] leading-[16px] font-Roboto">
                        Keep me up to date on news and exclusive offers.
                      </h2>
                    </div> */}
                  {touched.email && errors.email ? (
                    <Typography as={"span"} className="text-sm text-[#F75E54]">
                      {errors.email}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>

              {/* country */}
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="spacebetween"
                className="gap-2 flex-wrap   "
              >
                <div className="flex flex-row gap-1 items-center text-start ">
                  <Typography size="cardLabel" variant="label">
                    Country
                  </Typography>
                  {touched.country && errors.country && (
                    <FaStarOfLife color="#F75E54" size={8} />
                  )}
                </div>
                <Stack alignItems="start" direction="column">
                  <FormControl fullWidth>
                    <Field
                      component={Select}
                      name="country"
                      id="country"
                      value={values.country ? values.country.isoCode : ""}
                      options={updatedCountries}
                      onChange={(value) => {
                        setValues((prevValues) => ({
                          ...prevValues,
                          country: value.isoCode,
                          state: null,
                          city: null,
                        }));
                        console.log(values.country);
                      }}
                      error={touched.country && Boolean(errors.country)}
                      onBlur={handleBlur}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          padding: "7px",
                        }),
                      }}
                    />
                  </FormControl>
                  {touched.country && errors.country ? (
                    <Typography as={"span"} className="text-sm text-[#F75E54]">
                      {errors.country}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>

              {/* state */}
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="spacebetween"
                className="gap-2 flex-wrap   "
              >
                <div className="flex flex-row gap-1 items-center text-start ">
                  <Typography size="cardLabel" variant="label">
                    State/Province
                  </Typography>
                  {touched.state && errors.state && (
                    <FaStarOfLife color="#F75E54" size={8} />
                  )}
                </div>
                <Stack alignItems="start" direction="column">
                  <FormControl fullWidth>
                    <Field
                      component={Select}
                      name="state"
                      id="state"
                      value={values.state ? values.state.isoCode : ""}
                      options={states}
                      onChange={(value) => {
                        setValues((prevValues) => ({
                          ...prevValues,
                          state: value.isoCode,
                          city: null,
                        }));
                      }}
                      error={touched.state && Boolean(errors.state)}
                      onBlur={handleBlur}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          padding: "7px",
                        }),
                      }}
                    />
                  </FormControl>
                  {touched.state && errors.state ? (
                    <Typography as={"span"} className="text-sm text-[#F75E54]">
                      {errors.state}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>

              {/* city */}
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="spacebetween"
                className="gap-2 flex-wrap   "
              >
                <div className="flex flex-row gap-1 items-center text-start ">
                  <Typography size="cardLabel" variant="label">
                    City
                  </Typography>
                  {touched.city && errors.city && (
                    <FaStarOfLife color="#F75E54" size={8} />
                  )}
                </div>
                <Stack alignItems="start" direction="column">
                  <FormControl fullWidth>
                    <Field
                      component={Select}
                      name="city"
                      id="city"
                      value={values.city ? values.city.value : ""}
                      options={cities}
                      onChange={(value) => {
                        setFieldValue("city", value.value);
                      }}
                      error={touched.city && Boolean(errors.city)}
                      onBlur={handleBlur}
                      styles={{
                        control: (baseStyles, state) => ({
                          ...baseStyles,
                          padding: "7px",
                        }),
                      }}
                    />
                  </FormControl>
                  {touched.city && errors.city ? (
                    <Typography as={"span"} className="text-sm text-[#F75E54]">
                      {errors.city}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>

              {/* street address */}
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="spacebetween"
                className="gap-2 flex-wrap   "
              >
                <div className="flex flex-row gap-1 items-center text-start ">
                  <Typography size="cardLabel" variant="label">
                    Street Address
                  </Typography>
                  {touched.address && errors.address && (
                    <FaStarOfLife color="#F75E54" size={8} />
                  )}
                </div>
                <Stack alignItems="start" direction="column">
                  <Field
                    className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full    "
                    name={`address`}
                    value={values.address}
                    onChange={handleChange}
                    error={touched.address && Boolean(errors.address)}
                    onBlur={handleBlur}
                    //   placeholder={``}
                  />
                  <div className="flex flex-row items-center text-start ">
                    <FaStarOfLife color="#F75E54" size={8} />
                    <h2 className="font-normal text-[11px] leading-[16px] font-Roboto">
                      Detailed street address can help our rider find you
                      quickly.
                    </h2>
                  </div>
                  {touched.address && errors.address ? (
                    <Typography as={"span"} className="text-sm text-[#F75E54]">
                      {errors.address}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>

              {/* tel_whatsapp */}
              <Stack
                direction="column"
                alignItems="start"
                justifyContent="spacebetween"
                className="gap-2 flex-wrap   "
              >
                <div className="flex flex-row gap-1 items-center text-start ">
                  <Typography size="cardLabel" variant="label">
                    Tell/Whatsapp No.
                  </Typography>
                  {touched.tel_whatsapp && errors.tel_whatsapp && (
                    <FaStarOfLife color="#F75E54" size={8} />
                  )}
                </div>
                <Stack alignItems="start" direction="column">
                  <Field
                    className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full    "
                    id="tel_whatsapp"
                    name={`tel_whatsapp`}
                    type="tel"
                    value={values.tel_whatsapp}
                    onChange={handleChange}
                    error={touched.tel_whatsapp && Boolean(errors.tel_whatsapp)}
                    onBlur={handleBlur}
                    //   placeholder={``}
                    pattern="\+?[0-9]{3}-?[0-9]{6,12}"
                  />
                  {touched.tel_whatsapp && errors.tel_whatsapp ? (
                    <Typography as={"span"} className="text-sm text-[#F75E54]">
                      {errors.tel_whatsapp}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>

              {/* order notes */}
              <Stack
                direction="column"
                alignItems="start"
                className="gap-2 flex-wrap "
              >
                <div className="flex flex-row gap-1 items-center text-start ">
                  <Typography size="cardLabel" variant="label">
                    Order notes (optional)
                  </Typography>
                  {touched.orderNotes && errors.orderNotes && (
                    <FaStarOfLife color="#F75E54" size={8} />
                  )}
                </div>
                <Stack alignItems="start" direction="column">
                  <Field
                    className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full    "
                    name={`orderNotes`}
                    component="textarea"
                    rows={4}
                    value={values.orderNotes}
                    onChange={handleChange}
                    error={touched.orderNotes && Boolean(errors.orderNotes)}
                    onBlur={handleBlur}
                    placeholder={`Notes about your order, e.g. special notes for delivery.`}
                  />
                  {touched.orderNotes && errors.orderNotes ? (
                    <Typography as={"span"} className="text-sm text-[#F75E54]">
                      {errors.orderNotes}
                    </Typography>
                  ) : null}
                </Stack>
              </Stack>
            </div>

            {/* Right */}
            {products.length < 1 ? (
              <div className="items-center py-3 mx-auto flex ">
                <InfinitySpin
                  visible={true}
                  width="200"
                  color="#4fa94d"
                  ariaLabel="infinity-spin-loading"
                />
              </div>
            ) : (
              <Stack
                direction="column"
                alignItems="center"
                className={"w-full max-w-[533px] gap-6 "}
              >
                {/* top for product and subtotal */}
                <Stack
                  direction="column"
                  alignItems="center"
                  className={
                    "w-full  gap-[25px] border-b border-b-[#D9D9D9] pb-6 "
                  }
                >
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="spacebetween"
                    className={"w-full gap-[20px] "}
                  >
                    <Typography size="heading4" variant="black">
                      Product
                    </Typography>
                    <Typography size="heading4" variant="black">
                      Subtotal
                    </Typography>
                  </Stack>
                  {products.map((product, index) => {
                    return (
                      <Stack
                        alignItems="center"
                        direction="row"
                        justifyContent="spacebetween"
                        className={"w-full gap-[20px] "}
                      >
                        <div className="flex flex-row gap-8">
                          <Typography size="heading6" variant="grey3">
                            {product?.title}
                          </Typography>
                          <Typography size="heading6" variant="black">
                            X {product?.quantity}
                          </Typography>
                        </div>
                        <CurrencyFormat
                          value={product?.newPrice}
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
                    );
                  })}

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
                            checked={
                              shippingLocation === "lekki" ? true : false
                            }
                            onChange={() => {
                              setshippingLocation("lekki");
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
                            checked={
                              shippingLocation === "mainland" ? true : false
                            }
                            onChange={() => {
                              setshippingLocation("mainland");
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
                {/* Paystack payment button */}
                <Button
                  ripple
                  onClick={() => {
                    if (isPlaceOrder) {
                      dispatch(SET_BILLING_DETAILS(values));
                    }
                    initializePayment(onSuccess, onClose);
                  }}
                  className="w-full  "
                >
                  <div
                    className={`px-[150px] py-4 w-full  bg-[${
                      isPlaceOrder ? "#033514" : "#D9D9D9"
                    }]  rounded-[5px] items-center text-center`}
                  >
                    <Typography
                      variant={isPlaceOrder ? "white" : "black"}
                      size="buttons"
                    >
                      Place Order
                    </Typography>
                  </div>
                </Button>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Formik>
    </form>
  );
};

export default Checkout;
