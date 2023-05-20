import React, { createRef, useEffect, useRef, useState } from "react";
import Stack from "../../components/Stack/Stack";
import Typography from "../../components/Typography/Typography";
import Button from "../../components/Button/Button";
import { FaStarOfLife } from "react-icons/fa";
import { Field, Formik, useFormik } from "formik";
import { Checkbox, FormControl } from "@mui/material";
import { City, Country, State } from "country-state-city";
import Select from "react-select";
import Collection1 from "../../assets/Collection1.png";
import BillingValidationSchema from "../../utils/YupSchemaValidation/BillingDetails";
import { BsCreditCardFill } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import PaymentMethodLogo from "../../assets/PaymentMethod.svg";
import { ACCOUNT_NAME, BANK_NAME, BANK_NUMBER } from "../../constant/constant";
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  country: "",
  state: null,
  city: null,
  // district: "",
  //   zip: "",
  //   payment_method: "",
  tel_whatsapp: "",
  orderNotes: "",
  credit_card: {
    number: "",
    exp_month_year: "",
    holder_name: "",
    cvv: "",
  },
};

const Checkout = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isNextTab, setIsNextTab] = useState(false);
  const [isNextTabSetAlready, setIsNextTabSetAlready] = useState(false);

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
    isValid,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: BillingValidationSchema,
    onSubmit,
  });

  const countries = Country.getAllCountries();
  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.isoCode,
    ...country,
  }));

  useEffect(() => {
    if (values.country) {
      console.log(values.country);
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
      setFieldValue("city", null);
    }
  }, [values.state, setFieldValue]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

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
      setIsNextTabSetAlready(true);
    }
  }, [
    values.email,
    values.firstname,
    values.lastname,
    values.country,
    values.address,
    values.tel_whatsapp,
  ]);

  console.log(isValid);
  const [showPassword, setShowPassword] = useState(false);
  const [sliders, setSliders] = useState([]);
  const slider = [
    {
      mobileTransferMethod: "",
    },
    {
      cardForm: "",
    },
  ];

  // Create an array of refs, one for each slider
  const sliderRefs = useRef(slider.map(() => createRef()));

  // Create an object to store animation timeouts for each slider
  const [animationTimeouts, setAnimationTimeouts] = useState({});

  const handleSliderClick = (index) => {
    if (sliders.includes(index)) {
      setSliders(sliders.filter((i) => i !== index));
      clearTimeout(animationTimeouts[index]);
      setAnimationTimeouts((prev) => ({
        ...prev,
        [index]: null,
      }));
      sliderRefs.current[index].current.style.maxHeight = "0px";
    } else {
      const timeouts = { ...animationTimeouts };
      timeouts[index] = setTimeout(() => {
        sliderRefs.current[
          index
        ].current.style.maxHeight = `${sliderRefs.current[index].current.scrollHeight}px`;
      }, 0);
      setAnimationTimeouts(timeouts);
      setSliders([...sliders, index]);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Formik initialValues={initialValues}>
        <Stack
          direction="column"
          alignItems="center"
          className="gap-3 px-4 lg:px-14 py-8   "
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="row"
            className={"gap-2 flex-wrap"}
          >
            <div
              className={`w-[323px] py-2 items-center text-center bg-[${
                isNextTab ? "#E9E8E8" : "#079627"
              }] rounded-l-[10px]`}
            >
              <Typography
                variant={isNextTab ? "black" : "white"}
                size="bodyMedium"
              >
                Billing Address
              </Typography>
            </div>

            <div
              className={`w-[323px] py-2 items-center text-center bg-[${
                isNextTab ? "#079627" : "#E9E8E8"
              }] rounded-r-[10px] `}
            >
              <Typography
                variant={isNextTab ? "white" : "black"}
                size="bodyMedium"
              >
                Review & Payment
              </Typography>
            </div>
          </Stack>
          <Stack
            direction="row"
            alignItems="start"
            justifyContent="start"
            className={" relative z-10 border-b py-4 border-b-[#D9D9D9]  "}
          >
            <Typography variant="black" size="heading4">
              Billing Details
            </Typography>
          </Stack>

          <Stack
            direction="row"
            justifyContent="center"
            alignItems="start"
            className={"gap-16 mt-6 lg:justify-start flex-wrap"}
          >
            {/* Left */}

            {isNextTab ? (
              <Stack
                direction="column"
                alignItems="start"
                className={"gap-8 text-start w-full max-w-[445px] "}
              >
                {/* Contact, Ship to and Method */}
                <Stack
                  direction="column"
                  alignItems="center"
                  className={
                    "p-3 border gap-2 flex-wrap border-[#A7A7A7] rounded-[7px] "
                  }
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="spacebetween"
                    className={"p-4 border-b flex-wrap border-b-[#A7A7A7]  "}
                  >
                    <div className="flex flex-row gap-3 ">
                      <Typography size="lightText" className="text-[#818181] ">
                        Contact
                      </Typography>
                      <Typography size="lightText" variant="black">
                        {values?.email}
                      </Typography>
                    </div>
                    <Button
                      ripple={true}
                      onClick={() => {
                        setIsNextTab(false);
                      }}
                    >
                      <Typography size="lightText" className="text-[#079627] ">
                        Edit
                      </Typography>
                    </Button>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="spacebetween"
                    className={"p-4 border-b flex-wrap border-b-[#A7A7A7]  "}
                  >
                    <div className="flex flex-row gap-3 ">
                      <Typography size="lightText" className="text-[#818181] ">
                        Ship to
                      </Typography>
                      <Typography size="lightText" variant="black">
                        {values?.address}
                      </Typography>
                    </div>
                    <Button
                      ripple={true}
                      onClick={() => {
                        setIsNextTab(false);
                      }}
                    >
                      <Typography size="lightText" className="text-[#079627] ">
                        Edit
                      </Typography>
                    </Button>
                  </Stack>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="spacebetween"
                    className={"p-4 border-b flex-wrap border-b-[#A7A7A7]  "}
                  >
                    <div className="flex flex-row gap-3 ">
                      <Typography size="lightText" className="text-[#818181] ">
                        Method
                      </Typography>
                      <Typography size="lightText" variant="black">
                        Standard Shipping
                      </Typography>
                    </div>
                    <Button
                      ripple={true}
                      onClick={() => {
                        setIsNextTab(false);
                      }}
                    >
                      <Typography size="lightText" className="text-[#079627] ">
                        Edit
                      </Typography>
                    </Button>
                  </Stack>
                </Stack>

                <Stack
                  direction="column"
                  alignItems="start"
                  className={"text-start gap-2 "}
                >
                  <Stack
                    direction="column"
                    alignItems="start"
                    className={"text-start gap-1.5 "}
                  >
                    <h2 className="text-[20px] leading-[26px] font-medium tracking-[-0.9px] font-Roboto ">
                      Payment method
                    </h2>
                    <h2 className="text-[12px] leading-[130%] font-normal font-Montserrat  ">
                      All transactions are secure and encrypted.
                    </h2>
                  </Stack>

                  {/*  */}
                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="spacebetween"
                    className={`bg-[#07962766] p-4 rounded-t-[7px] `}
                  >
                    <div className=" flex flex-row gap-2 items-center ">
                      <BsCreditCardFill size={20} />
                      <h2 className="text-[16px] leading-[16px] text-[#303328] font-extrabold tracking-[-0.9px] font-Roboto ">
                        Mobile Transfer
                      </h2>
                    </div>
                    <Button ripple={true} onClick={() => handleSliderClick(0)}>
                      {sliders.includes(0) ? (
                        <IoIosArrowUp size={20} />
                      ) : (
                        <IoIosArrowDown size={20} />
                      )}
                    </Button>
                  </Stack>
                  <div
                    ref={sliderRefs.current[0]}
                    style={{
                      maxHeight: "0px",
                      overflow: "hidden",
                      transition: "max-height 0.5s ease-in-out",
                    }}
                    className=" flex flex-col gap-3 items-start text-start "
                  >
                    <div className="flex flex-row gap-5 items-start text-start ">
                      <h2 className="text-[12px] leading-[130%] text-[#000000] font-normal font-Roboto ">
                        Bank Name
                      </h2>
                      <h2 className="text-[12px] leading-[130%] text-[#000000] font-normal font-Roboto ">
                        {BANK_NAME}
                      </h2>
                    </div>
                    <div className="flex flex-row gap-5 items-start text-start ">
                      <h2 className="text-[12px] leading-[130%] text-[#000000] font-normal font-Roboto ">
                        Bank No.
                      </h2>
                      <h2 className="text-[12px] leading-[130%] text-[#000000] font-normal font-Roboto ">
                        {BANK_NUMBER}
                      </h2>
                    </div>
                    <div className="flex flex-row gap-5 items-start text-start ">
                      <h2 className="text-[12px] leading-[130%] text-[#000000] font-normal font-Roboto ">
                        Account Name
                      </h2>
                      <h2 className="text-[12px] leading-[130%] text-[#000000] font-normal font-Roboto ">
                        {ACCOUNT_NAME}
                      </h2>
                    </div>
                  </div>

                  <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="spacebetween"
                    className={`bg-[#07962766] p-2 rounded-t-[7px] `}
                  >
                    <div className=" flex flex-row gap-2 items-center ">
                      <BsCreditCardFill size={20} />
                      <h2 className="text-[16px] leading-[16px] text-[#303328] font-extrabold tracking-[-0.9px] font-Roboto ">
                        Credit Card/Debit Card
                      </h2>
                      <img src={PaymentMethodLogo} alt="Payment Method" />
                    </div>
                    <Button ripple={true} onClick={() => handleSliderClick(1)}>
                      {sliders.includes(1) ? (
                        <IoIosArrowUp size={20} />
                      ) : (
                        <IoIosArrowDown size={20} />
                      )}
                    </Button>
                  </Stack>
                  <div
                    ref={sliderRefs.current[1]}
                    style={{
                      maxHeight: "0px",
                      overflow: "hidden",
                      transition: "max-height 0.5s ease-in-out",
                    }}
                    className=" flex flex-col gap-3 items-center w-full text-center "
                  >
                    <Stack
                      alignItems="start"
                      direction="column"
                      className="max-w-[408px] relative "
                    >
                      <input
                        className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full     "
                        name={`credit_card.number`}
                        value={values?.credit_card?.number}
                        onChange={handleChange}
                        error={
                          touched?.credit_card?.number &&
                          Boolean(errors?.credit_card?.number)
                        }
                        type={showPassword ? "text" : "password"}
                        onBlur={handleBlur}
                        placeholder={`Card Number`}
                      />
                      <button
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 hover:text-gray-500 focus:outline-none"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 12l2-2m0 0l2-2m-2 2v4m0-4l-2 2m2 2h4m-4 0l2 2"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7.88 7.88a9 9 0 0112.24 0M11 15a9 9 0 002.99 3.01M12 12v.01"
                            />
                          </svg>
                        )}
                      </button>

                      {touched?.credit_card?.number &&
                      errors?.credit_card?.number ? (
                        <Typography
                          as={"span"}
                          className="text-sm text-[#F75E54]"
                        >
                          {errors?.credit_card?.number}
                        </Typography>
                      ) : null}
                    </Stack>

                    <Stack
                      alignItems="start"
                      direction="column"
                      className="max-w-[408px] relative "
                    >
                      <Field
                        className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full     "
                        name={`credit_card.holder_name`}
                        value={values?.credit_card?.holder_name}
                        onChange={handleChange}
                        error={
                          touched?.credit_card?.holder_name &&
                          Boolean(errors?.credit_card?.holder_name)
                        }
                        onBlur={handleBlur}
                        placeholder={`Holder Name`}
                      />
                      {touched?.credit_card?.holder_name &&
                      errors?.credit_card?.holder_name ? (
                        <Typography
                          as={"span"}
                          className="text-sm text-[#F75E54]"
                        >
                          {errors?.credit_card?.holder_name}
                        </Typography>
                      ) : null}
                    </Stack>

                    <Stack
                      direction="row"
                      alignItems="center"
                      className={`gap-2  w-full max-w-[408px]`}
                    >
                      <Stack
                        alignItems="start"
                        direction="column"
                        className="max-w-[408px] relative "
                      >
                        <Field
                          className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full     "
                          name={`credit_card.exp_month_year`}
                          value={values?.credit_card?.exp_month_year}
                          onChange={handleChange}
                          error={
                            touched?.credit_card?.exp_month_year &&
                            Boolean(errors?.credit_card?.exp_month_year)
                          }
                          onBlur={handleBlur}
                          placeholder={`Expiration (MM/YY)`}
                        />
                        {touched?.credit_card?.exp_month_year &&
                        errors?.credit_card?.exp_month_year ? (
                          <Typography
                            as={"span"}
                            className="text-sm text-[#F75E54]"
                          >
                            {errors?.credit_card?.exp_month_year}
                          </Typography>
                        ) : null}
                      </Stack>

                      <Stack
                        alignItems="start"
                        direction="column"
                        className="max-w-[408px] relative "
                      >
                        <input
                          className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full     "
                          name={`credit_card.cvv`}
                          value={values?.credit_card?.cvv}
                          onChange={handleChange}
                          error={
                            touched?.credit_card?.cvv &&
                            Boolean(errors?.credit_card?.cvv)
                          }
                          onBlur={handleBlur}
                          placeholder={`CVV`}
                          type="number"
                        />
                        {touched?.credit_card?.cvv &&
                        errors?.credit_card?.cvv ? (
                          <Typography
                            as={"span"}
                            className="text-sm text-[#F75E54]"
                          >
                            {errors?.credit_card?.cvv}
                          </Typography>
                        ) : null}
                      </Stack>
                    </Stack>
                  </div>
                </Stack>
              </Stack>
            ) : (
              <div className="gap-2 flex flex-col items-start text-start justify-start w-full max-w-[480px]  ">
                {/* email */}
                <Stack
                  direction="column"
                  alignItems="start"
                  justifyContent="spacebetween"
                  className="gap-2 flex-wrap md:flex-row  "
                >
                  <div className="flex flex-row gap-1 items-center text-start ">
                    <Typography size="cardLabel" variant="label">
                      Email Address
                    </Typography>
                    {touched.email && errors.email && (
                      <FaStarOfLife color="#F75E54" size={8} />
                    )}
                  </div>
                  <Stack
                    alignItems="start"
                    direction="column"
                    className="max-w-[327px]"
                  >
                    <Field
                      className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full    "
                      name={`email`}
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      onBlur={handleBlur}
                      //   placeholder={``}
                    />
                    <div className="flex flex-row items-center text-start ">
                      <Checkbox
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        inputProps={{ "aria-label": "controlled" }}
                      />
                      <h2 className="font-normal text-[11px] leading-[16px] font-Roboto">
                        Keep me up to date on news and exclusive offers.
                      </h2>
                    </div>
                    {touched.email && errors.email ? (
                      <Typography
                        as={"span"}
                        className="text-sm text-[#F75E54]"
                      >
                        {errors.email}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>

                {/* firstname */}
                <Stack
                  direction="column"
                  alignItems="start"
                  justifyContent="spacebetween"
                  className="gap-2 flex-wrap md:flex-row  "
                >
                  <div className="flex flex-row gap-1 items-center text-start ">
                    <Typography size="cardLabel" variant="label">
                      Firstname
                    </Typography>
                    {touched.firstname && errors.firstname && (
                      <FaStarOfLife color="#F75E54" size={8} />
                    )}
                  </div>
                  <Stack
                    alignItems="start"
                    direction="column"
                    className="max-w-[327px]"
                  >
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
                      <Typography
                        as={"span"}
                        className="text-sm text-[#F75E54]"
                      >
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
                  className="gap-2 flex-wrap md:flex-row  "
                >
                  <div className="flex flex-row gap-1 items-center text-start ">
                    <Typography size="cardLabel" variant="label">
                      Lastname
                    </Typography>
                    {touched.lastname && errors.lastname && (
                      <FaStarOfLife color="#F75E54" size={8} />
                    )}
                  </div>
                  <Stack
                    alignItems="start"
                    direction="column"
                    className="max-w-[327px]"
                  >
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
                      <Typography
                        as={"span"}
                        className="text-sm text-[#F75E54]"
                      >
                        {errors.lastname}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>

                {/* country */}
                <Stack
                  direction="column"
                  alignItems="start"
                  justifyContent="spacebetween"
                  className="gap-2 flex-wrap md:flex-row  "
                >
                  <div className="flex flex-row gap-1 items-center text-start ">
                    <Typography size="cardLabel" variant="label">
                      Country
                    </Typography>
                    {touched.country && errors.country && (
                      <FaStarOfLife color="#F75E54" size={8} />
                    )}
                  </div>
                  <Stack
                    alignItems="start"
                    direction="column"
                    className="max-w-[327px]"
                  >
                    <FormControl fullWidth>
                      <Field
                        component={Select}
                        name="country"
                        id="country"
                        value={values.country ? values.country.isoCode : ""}
                        options={updatedCountries}
                        onChange={(value) => {
                          setValues(
                            { country: value.isoCode, state: null, city: null },
                            false
                          );
                          console.log(values.country);
                        }}
                        error={touched.country && Boolean(errors.country)}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                    {touched.country && errors.country ? (
                      <Typography
                        as={"span"}
                        className="text-sm text-[#F75E54]"
                      >
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
                  className="gap-2 flex-wrap md:flex-row  "
                >
                  <div className="flex flex-row gap-1 items-center text-start ">
                    <Typography size="cardLabel" variant="label">
                      State/Province
                    </Typography>
                    {touched.state && errors.state && (
                      <FaStarOfLife color="#F75E54" size={8} />
                    )}
                  </div>
                  <Stack
                    alignItems="start"
                    direction="column"
                    className="max-w-[327px]"
                  >
                    <FormControl fullWidth>
                      <Field
                        component={Select}
                        name="state"
                        id="state"
                        value={values.state ? values.state.isoCode : ""}
                        options={states}
                        onChange={(value) => {
                          setValues(
                            { ...values, state: value.isoCode, city: null },
                            false
                          );
                        }}
                        error={touched.state && Boolean(errors.state)}
                        onBlur={handleBlur}
                      />
                    </FormControl>
                    {touched.state && errors.state ? (
                      <Typography
                        as={"span"}
                        className="text-sm text-[#F75E54]"
                      >
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
                  className="gap-2 flex-wrap md:flex-row  "
                >
                  <div className="flex flex-row gap-1 items-center text-start ">
                    <Typography size="cardLabel" variant="label">
                      City
                    </Typography>
                    {touched.city && errors.city && (
                      <FaStarOfLife color="#F75E54" size={8} />
                    )}
                  </div>
                  <Stack
                    alignItems="start"
                    direction="column"
                    className="max-w-[327px]"
                  >
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
                      />
                    </FormControl>
                    {touched.city && errors.city ? (
                      <Typography
                        as={"span"}
                        className="text-sm text-[#F75E54]"
                      >
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
                  className="gap-2 flex-wrap md:flex-row  "
                >
                  <div className="flex flex-row gap-1 items-center text-start ">
                    <Typography size="cardLabel" variant="label">
                      Street Address
                    </Typography>
                    {touched.address && errors.address && (
                      <FaStarOfLife color="#F75E54" size={8} />
                    )}
                  </div>
                  <Stack
                    alignItems="start"
                    direction="column"
                    className="max-w-[327px]"
                  >
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
                      <Typography
                        as={"span"}
                        className="text-sm text-[#F75E54]"
                      >
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
                  className="gap-2 flex-wrap md:flex-row  "
                >
                  <div className="flex flex-row gap-1 items-center text-start ">
                    <Typography size="cardLabel" variant="label">
                      Tell/Whatsapp No.
                    </Typography>
                    {touched.tel_whatsapp && errors.tel_whatsapp && (
                      <FaStarOfLife color="#F75E54" size={8} />
                    )}
                  </div>
                  <Stack
                    alignItems="start"
                    direction="column"
                    className="max-w-[327px]"
                  >
                    <Field
                      className="border flex border-solid border-[#C0C0C0] bg-[#FFFFFF] rounded-[3px] py-[12px] px-[16px] w-full    "
                      id="tel_whatsapp"
                      name={`tel_whatsapp`}
                      type="tel"  
                      value={values.tel_whatsapp}
                      onChange={handleChange}
                      error={
                        touched.tel_whatsapp && Boolean(errors.tel_whatsapp)
                      }
                      onBlur={handleBlur}
                      //   placeholder={``}
                      pattern="\+?[0-9]{3}-?[0-9]{6,12}"
                    />
                    {touched.tel_whatsapp && errors.tel_whatsapp ? (
                      <Typography
                        as={"span"}
                        className="text-sm text-[#F75E54]"
                      >
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
                  <Stack
                    alignItems="start"
                    direction="column"
                    className="max-w-[480px]"
                  >
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
                      <Typography
                        as={"span"}
                        className="text-sm text-[#F75E54]"
                      >
                        {errors.orderNotes}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>
              </div>
            )}

            {/* Right */}
            <Stack
              direction="column"
              alignItems="center"
              className={"w-full max-w-[343px] gap-6 "}
            >
              <div className="border-y border-y-[#A7A7A7] p-4 w-full max-w-[343px] ">
                <div className="flex flex-wrap gap-3 items-center justify-center text-center ">
                  <div
                    style={{
                      padding: "4px",
                      alignItems: "center",
                      justifyContent: "center",
                      // marginBottom: "6px",
                      border: "1px solid #EDE1E1",
                      position: "relative",
                    }}
                  >
                    <div className="w-[72.69px] h-[71.14px] items-center  ">
                      <img
                        src={Collection1}
                        alt="..."
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-start text-start ">
                    <Typography variant="black" size="heading6">
                      Curly Hair Extensions
                    </Typography>
                    <span className=" text-[#079627] text-[12px] leading-[16px] font-normal font-Roboto ">
                      ₦ 63,235
                    </span>
                    <span className=" text-[#CFCFCF] text-[12px] leading-[16px] font-normal font-Roboto ">
                      Qty: 1
                    </span>
                  </div>
                </div>
              </div>

              <Stack direction="column" alignItems="center" className={`gap-4`}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="spacebetween"
                  className={`flex-wrap gap-2 text-center `}
                >
                  <Typography variant="black" size="lightText">
                    Cart Subtotal:
                  </Typography>
                  <span className=" text-[#000000] text-[18px] leading-[160%] font-normal font-Roboto ">
                    ₦ 6,990
                  </span>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="spacebetween"
                  className={`flex-wrap gap-2 text-center `}
                >
                  <Typography variant="black" size="lightText">
                    Delivery Fee
                  </Typography>
                  <span className=" text-[#000000] text-[18px] leading-[160%] font-normal font-Roboto ">
                    ₦ 6,990
                  </span>
                </Stack>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="spacebetween"
                  className={`flex-wrap gap-2 text-center `}
                >
                  <Typography variant="black" size="lightText">
                    Order Total
                  </Typography>
                  <span className=" text-[#000000] text-[18px] leading-[160%] font-normal font-Roboto ">
                    ₦ 6,990
                  </span>
                </Stack>

                <Button ripple onClick={() => {}} className="w-full  ">
                  <div className="px-[115px] py-4 w-full  bg-[#033514] rounded-[5px] items-center text-center ">
                    <Typography variant="white" size="buttons">
                      Complete Order
                    </Typography>
                  </div>
                </Button>
              </Stack>
            </Stack>
          </Stack>
          {!isNextTab && (
            <Stack
              alignItems="center"
              justifyContent="center"
              className={`m-auto p-8 border-t border-t-[#D9D9D9] mt-10 `}
            >
              <Button
                ripple
                onClick={() => {
                  isNextTabSetAlready && setIsNextTab(true);
                }}
                className="w-full  "
              >
                <div
                  className={`px-[150px] py-4 w-full  bg-[${
                    isNextTabSetAlready ? "#033514" : "#D9D9D9"
                  }]  rounded-[5px] items-center text-center`}
                >
                  <Typography
                    variant={isNextTabSetAlready ? "white" : "black"}
                    size="buttons"
                  >
                    Next
                  </Typography>
                </div>
              </Button>
            </Stack>
          )}
        </Stack>
      </Formik>
    </form>
  );
};

export default Checkout;
