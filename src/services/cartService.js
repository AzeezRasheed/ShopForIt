import axios from "axios";

export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log(BACKEND_URL);

const createCart = async (formData) => {
  const response = await axios.post(`${BACKEND_URL}/api/v1/carts/`, formData);
  return response.data;
};

const getCarts = async () => {
  // const location = useLocation()
  const response = await axios.get(`${BACKEND_URL}/api/v1/carts/`);
  return response.data;
};

const getCart = async (id) => {
  const response = await axios.get(`${BACKEND_URL}/api/v1/carts/${id}`);
  return response.data;
};

const deleteCart = async (id) => {
  const response = await axios.delete(`${BACKEND_URL}/api/v1/carts/${id}`);
  console.log(id);
  return response.data;
};

const updateCart = async (formData, id) => {
  console.log(formData, id);
  const response = await axios.patch(
    `${BACKEND_URL}/api/v1/carts/${id}`,
    formData
  );
  return response.data;
};

const cartService = {
  createCart,
  getCarts,
  getCart,
  deleteCart,
  updateCart,
};

export default cartService;
