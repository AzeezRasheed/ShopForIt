import * as Yup from "yup";

export const ContactUsSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  subject: Yup.string(),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Please state your message"),
});
