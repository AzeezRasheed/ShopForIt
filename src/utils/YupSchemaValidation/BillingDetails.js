import * as Yup from "yup";

const BillingValidationSchema = Yup.object({
  firstname: Yup.string().required("Firstname is required"),
  lastname: Yup.string().required("Lastname is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  country: Yup.string().required("Country is required"),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required"),
  // district: Yup.string().required("District is required"),
  // zip: Yup.string()
  //   .required("Zip code is required")
  //   .matches(/^\d{5}(?:[-\s]\d{4})?$/, "Invalid zip code"),
  // payment_method: Yup.string().required("Payment method is required"),
  credit_card: Yup.object({
    number: Yup.string()
      .required("Credit card number is required")
      .matches(/^\d{16}$/, "Invalid credit card number"),
    exp_month_year: Yup.string().required(
      "Expiration m/y is required"
    ),
    holder_name: Yup.string().required("Holder Name is required"),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3}$/, "Invalid CVV"),
  }),
  tel_whatsapp: Yup.string()
    .matches(/^[+]\d{11,}$/, "Invalid Tel/Whatsapp number, add + ")
    .required("Tel/Whatsapp number is required"),
  orderNotes: Yup.string().max(
    500,
    "Order notes must be less than or equal to 500 characters"
  ),
});

export default BillingValidationSchema;
