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
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
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
    if (response.data.token) {
      localStorage.setItem("user", JSON.stringify(response.data));
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

export const getUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/get-user`);
    return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};

export const updateUser = async (formData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/v1/update-user`,
      formData
    );
    if (response.status === 200) {
      toast.success("Successfully Updated User ...");
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

export const changePassword = async (formData) => {
  try {
    const response = await axios.patch(
      `${BACKEND_URL}/api/v1/change-password`,
      formData
    );
    if (response.status === 200) {
      toast.success("Successfully Changed Password ...");
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

export const logoutUser = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/v1/logout`);
    if (response.status === 200) {
      console.log("user logged out");
    }
    return response;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    toast.error(message);
  }
};
