import React, { useState } from "react";
import { RiUserAddLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Formik, useFormik } from "formik";
import { signupLoginSchema } from "../../helper/schema/schema";
import { REGISTER_USER } from "../../services/authServices";
import { SET_FIRSTNAME, SET_LOGIN, SET_USER } from "../../redux/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../components/Loader/Spinner";
import axios from "axios";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phone: "",
  password: "",
  password2: "",
};

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    setIsLoading(true);
    // Submit form logic here
    console.log(values);
    const { firstname, lastname, email, phone, password } = values;

    try {
      const data = await REGISTER_USER({
        firstname,
        lastname,
        email,
        phone,
        password,
      });
      await dispatch(SET_USER(data));
      await dispatch(SET_FIRSTNAME(data.firstname));
      await dispatch(SET_LOGIN(true));

      // Store the bearer token in local storage
      localStorage.setItem("token", data.token);

      // Set the default Authorization header for Axios requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
      navigate("/");
      setIsLoading(false);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: signupLoginSchema,
    onSubmit,
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <form onSubmit={handleSubmit}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          {isLoading && <Spinner />}

          <div className="w-full max-w-md space-y-8">
            <div>
              <RiUserAddLine size={35} className="mx-auto h-12 w-auto" />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                Register
              </h2>
            </div>
            <div className="mt-8 space-y-6">
              <input type="hidden" name="remember" value="true" />
              <div className="flex flex-col -space-y-px rounded-md shadow-sm gap-2">
                {/* firstname */}
                <div>
                  <label htmlFor="firstname" className="sr-only">
                    First Name
                  </label>

                  <input
                    id="firstname"
                    name="firstname"
                    type="firstname"
                    value={values.firstname}
                    autoComplete="firstname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 ${
                      errors.firstname && touched.firstname
                        ? "border-redtext-red-500"
                        : ""
                    }`}
                    placeholder="Firstname"
                  />
                  {errors.firstname && touched.firstname && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.firstname}
                    </div>
                  )}
                </div>

                {/* lastname */}
                <div>
                  <label htmlFor="lastname" className="sr-only">
                    Last Name
                  </label>
                  <input
                    id="lastname"
                    name="lastname"
                    type="lastname"
                    value={values.lastname}
                    autoComplete="lastname"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 ${
                      errors.lastname && touched.lastname
                        ? "border-redtext-red-500"
                        : ""
                    }`}
                    placeholder="Lastname"
                  />
                  {errors.lastname && touched.lastname && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.lastname}
                    </div>
                  )}
                </div>

                {/* Email Address */}
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={values.email}
                    autoComplete="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 ${
                      errors.email && touched.email
                        ? "border-redtext-red-500"
                        : ""
                    }`}
                    placeholder="Email"
                  />
                  {errors.email && touched.email && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.email}
                    </div>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label htmlFor="phone" className="sr-only">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={values.org_id}
                    autoComplete="phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 ${
                      errors.phone && touched.phone
                        ? "border-redtext-red-500"
                        : ""
                    }`}
                    placeholder="Phone Number"
                  />
                  {errors.phone && touched.phone && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.phone}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={values.password}
                    autoComplete="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 ${
                      errors.password && touched.password
                        ? "border-redtext-red-500"
                        : ""
                    }`}
                    placeholder="Password"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="password2" className="sr-only">
                    Confirm Password
                  </label>
                  <input
                    id="password2"
                    name="password2"
                    type="password"
                    value={values.password2}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 ${
                      errors.password2 && touched.password2
                        ? "border-redtext-red-500"
                        : ""
                    }`}
                    placeholder="Confirm Password"
                  />
                  {errors.password2 && touched.password2 && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.password2}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Go to Home
                    </Link>
                  </div>

                  <Link
                    to="/auth/login"
                    className="text-[16px] flex flex-row font-medium text-black hover:text-indigo-700 "
                  >
                    <p>Already Registered? &nbsp;</p>
                    <p>Login</p>
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3"></span> */}
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </form>
  );
}

export default Register;
