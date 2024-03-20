import React from "react";
import { FaStarOfLife } from "react-icons/fa";
// import { useState } from "react";
// import { BACKEND_URL } from "../../../services/productServices";
import { Field, Formik, useFormik } from "formik";
import Stack from "./Stack/Stack";
import Typography from "./Typography/Typography";
import Button from "./Button/Button";
import { ContactUsSchema } from "../utils/YupSchemaValidation/ContactUsSchema";

const initialValues = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function ContactUsForm() {
  const onSubmit = async () => {
    try {
      // const response = await axios.post(`${BACKEND_URL}/api/v1/contact-us`, values);
      // setSubject("");
      // setMessage("");
      // toast.success(response.data.message);
      console.log(values);
    } catch (error) {
      console.log(error);
      // toast.error(error.message);
    }
  };

  const {
    values,
    handleChange,
    handleSubmit,
    touched,
    errors,
    handleBlur,
  } = useFormik({
    initialValues,
    validationSchema: ContactUsSchema,
    onSubmit,
  });


  return (
    <form onSubmit={handleSubmit} className="w-full max-w-[480px]">
      <Formik initialValues={initialValues}>
        <div className="gap-7 flex flex-col items-start text-start justify-start w-full   ">
          {/* Name */}
          <Stack direction="column" alignItems="start" className="gap-2  ">
            <div className="flex flex-row gap-1 items-center text-start ">
              <h2 className="text-[16px]  font-[500] font-Poppins ">
                Your name
              </h2>
              {touched.name && errors.name && (
                <FaStarOfLife color="#F75E54" size={8} />
              )}
            </div>
            <Stack
              alignItems="start"
              direction="column"
              className="max-w-[ 528.75px]"
            >
              <Field
                className="border flex border-solid border-[#9F9F9F] bg-[#FFFFFF] rounded-[10px] py-[18px] px-[16px] w-full     "
                name={`name`}
                value={values.name}
                onChange={handleChange}
                error={touched.name && Boolean(errors.name)}
                onBlur={handleBlur}
                placeholder={`Abc`}
              />
              {touched.name && errors.name ? (
                <Typography as={"span"} className="text-sm text-[#F75E54]">
                  {errors.name}
                </Typography>
              ) : null}
            </Stack>
          </Stack>

          {/* Email Address */}
          <Stack direction="column" alignItems="start" className="gap-2  ">
            <div className="flex flex-row gap-1 items-center text-start ">
              <h2 className="text-[16px]  font-[500] font-Poppins ">
                Email Address
              </h2>
              {touched.email && errors.email && (
                <FaStarOfLife color="#F75E54" size={8} />
              )}
            </div>
            <Stack
              alignItems="start"
              direction="column"
              className="max-w-[ 528.75px]"
            >
              <Field
                className="border flex border-solid border-[#9F9F9F] bg-[#FFFFFF] rounded-[10px] py-[18px] px-[16px] w-full     "
                name={`email`}
                value={values.email}
                onChange={handleChange}
                error={touched.email && Boolean(errors.email)}
                onBlur={handleBlur}
                placeholder={`Abc@def.com`}
              />
              {touched.email && errors.email ? (
                <Typography as={"span"} className="text-sm text-[#F75E54]">
                  {errors.email}
                </Typography>
              ) : null}
            </Stack>
          </Stack>

          {/* Subject */}
          <Stack direction="column" alignItems="start" className="gap-2  ">
            <div className="flex flex-row gap-1 items-center text-start ">
              <h2 className="text-[16px]  font-[500] font-Poppins ">Subject</h2>
              {touched.subject && errors.subject && (
                <FaStarOfLife color="#F75E54" size={8} />
              )}
            </div>
            <Stack
              alignItems="start"
              direction="column"
              className="max-w-[ 528.75px]"
            >
              <Field
                className="border flex border-solid border-[#9F9F9F] bg-[#FFFFFF] rounded-[10px] py-[18px] px-[16px] w-full     "
                name={`subject`}
                value={values.subject}
                onChange={handleChange}
                error={touched.subject && Boolean(errors.subject)}
                onBlur={handleBlur}
                placeholder={`This is Optional`}
              />
              {touched.subject && errors.subject ? (
                <Typography as={"span"} className="text-sm text-[#F75E54]">
                  {errors.subject}
                </Typography>
              ) : null}
            </Stack>
          </Stack>

          {/* Message */}
          <Stack direction="column" alignItems="start" className="gap-2  ">
            <div className="flex flex-row gap-1 items-center text-start ">
              <h2 className="text-[16px]  font-[500] font-Poppins ">Message</h2>
              {touched.message && errors.message && (
                <FaStarOfLife color="#F75E54" size={8} />
              )}
            </div>
            <Stack
              alignItems="start"
              direction="column"
              className="max-w-[ 528.75px]"
            >
              <Field
                className="border flex border-solid border-[#9F9F9F] bg-[#FFFFFF] rounded-[10px] py-[18px] px-[16px] w-full     "
                name={`message`}
                value={values.message}
                onChange={handleChange}
                error={touched.message && Boolean(errors.message)}
                onBlur={handleBlur}
                rows={4}
                component="textarea"
                placeholder={`Hi! i’d like to ask about`}
              />
              {touched.message && errors.message ? (
                <Typography as={"span"} className="text-sm text-[#F75E54]">
                  {errors.message}
                </Typography>
              ) : null}
            </Stack>
          </Stack>

          {/* Submit Button */}
          <Button
            ripple={true}
            onClick={handleSubmit}
            className="bg-[#033514] text-white py-[14px] rounded-[5px]  px-[60px] gap-[10px] inline-flex "
          >
            Submit
          </Button>
        </div>
      </Formik>
    </form>
  );
}

export default ContactUsForm;
