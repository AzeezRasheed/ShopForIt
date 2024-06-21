import * as Yup from "yup";

export const authLoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Invalid email address"
    )
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export const signupLoginSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  phone: Yup.string()
    .matches(/^\+(?:[0-9]){1,3}[0-9-]{4,14}(?:x.+)?$/, "Invalid phone number")
    .required("Phone number is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email address is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
  password2: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password")], "Passwords must match"),
});

export const addProductSchema = Yup.object().shape({
  images: Yup.array()
    .min(1, "At least one image is required")
    .of(
      Yup.mixed().test("fileFormat", "Unsupported file format", (value) => {
        if (!value) return true;
        const supportedFormats = ["image/jpeg", "image/jpg", "image/png"];
        return supportedFormats.includes(value.type);
      })
    ),
  descriptions: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Description name is required"),
      value: Yup.string().required("Description value is required"),
    })
  ),
  additionalInfo: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Additional information name is required"),
      value: Yup.string().required(
        "Additional information name value is required"
      ),
    })
  ),
  categories: Yup.array()
    .of(Yup.string().required("Category is required"))
    .min(2, "Must have at least two categories ")
    .required("Categories  are required"),
  event: Yup.string().required("event type is required"),
  title: Yup.string().required("Title is required"),
  collections: Yup.string().required("collection type is required"),
  oldPrice: Yup.string().required("Old price is required"),
  newPrice: Yup.string().required("New price is required"),
});
