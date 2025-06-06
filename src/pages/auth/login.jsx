import React, { useState } from "react";
import { RiLoginBoxLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { Formik, useFormik } from "formik";
import { authLoginSchema } from "../../helper/schema/schema";
import { SET_USER } from "../../redux/auth/authSlice";
import { useNavigate } from "react-router";
import Spinner from "../../components/Loader/Spinner";
import { LOGIN_USER } from "../../services/authServices";
import { Link } from "react-router-dom";

const initialValues = {
  email: "",
  password: "",
};

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    setIsLoading(true);
    // Submit form logic here
    try {
      const data = await LOGIN_USER(values);
      await dispatch(SET_USER(data));
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: authLoginSchema,
    onSubmit,
  });

  const { errors, touched, values, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <form onSubmit={handleSubmit}>
      {isLoading && <Spinner />}
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <div>
          <div className="relative flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              <div>
                <RiLoginBoxLine size={35} className="mx-auto h-12 w-auto" />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>
              <div className="mt-8 space-y-6">
                <input type="hidden" name="remember" value="true" />
                <div className="flex flex-col -space-y-px rounded-md shadow-sm gap-2">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      value={values.email}
                      autoComplete="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 ${
                        errors.email && touched.email ? "border-error" : ""
                      }`}
                      placeholder="Email address"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={values.password}
                      autoComplete="current-password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 ${
                        errors.password && touched.password
                          ? "border-error"
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

                    {/* <div className="text-sm">
                      <Link
                        href="auth/forgot"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </Link>
                    </div> */}
                    <div></div>
                  </div>
                  <Link
                    to="/auth/register"
                    className="text-[16px] flex flex-row font-medium text-black hover:text-indigo-700 "
                  >
                    <p>Don&apos;t have an account? &nbsp;</p>
                    <p>Register</p>
                  </Link>
                </div>

                <div>
                  <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-black hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                    Sign in
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Formik>
    </form>
  );
}

export default Login;
