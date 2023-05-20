import axios from "axios";
import { toast } from "react-toastify";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log({ BACKEND_URL });

export const REGISTER_USER = async (formData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/register`,
      formData,
      { withCredentials: true }
    );
    if (response.status === 200) {
      toast.success("Successfully Registered User");
    }
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const LOGIN_USER = async (formData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/v1/login`, formData, {
      withCredentials: true,
    });
    if (response.status === 200) {
      toast.success("Welcome ☺️");
    }
    console.log(response.data);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const IS_LOGGEDIN = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/is-loggedin`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
