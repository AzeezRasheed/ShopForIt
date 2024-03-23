import React, { useEffect, useRef, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { deleteProduct, getProducts } from "../redux/product/productSlice";
import Button from "./Button/Button";
import CurrencyFormat from "react-currency-format";
import {
  decrementQuantity,
  incrementQuantity,
  removeItem,
  useGetCart,
} from "../redux/cart/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import Typography from "./Typography/Typography";
import axios from "axios";
import { toast } from "react-toastify";
import ConfirmDelete from "./ConfirmDelete";

const CartsTable = () => {
  const dispatch = useDispatch();
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
  const cartItems = useGetCart();
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comfirmProductDeleteId, setComfirmProductDeleteId] = useState("");

  const handleDelete = async () => {
    await delProduct(comfirmProductDeleteId);
    setIsModalOpen(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const fetchedProducts = await Promise.all(
          cartItems.map(async (cartItem) => {
            const response = await axios.get(
              `${BACKEND_URL}/api/v1/products/${cartItem.id}`
            );
            return {
              ...response.data,
              quantity: cartItem.quantity,
              stretchedLength: cartItem.stretchedLength,
            };
          })
        );
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error(
          error.response?.data?.message || error.message || error.toString()
        );
      }
    };
    fetchedProducts();
  }, [cartItems, BACKEND_URL]);

  const shortenWord = (name, num) => {
    return name.length > num ? name.substring(0, num).concat("...") : name;
  };

  const delProduct = async (id) => {
    await dispatch(removeItem(id));
    await dispatch(getProducts());
  };

  return (
    <div>
      <div className="overflow-x-auto ">
        {products?.length < 1 ? (
          <div className="items-center py-3 mx-auto flex justify-center m-auto">
            <InfinitySpin
              visible={true}
              width="200"
              color="#4fa94d"
              ariaLabel="infinity-spin-loading"
            />
          </div>
        ) : (
          <table className=" text-sm text-left text-black font-bold">
            <thead className="text-[1rem] text-black font-bold">
              <tr className="items-center justify-center text-center">
                <th scope="col" className="py-3 px-6">
                  PRODUCT
                </th>
                <th scope="col" className="py-3 px-6">
                  PRICE
                </th>
                <th scope="col" className="py-3 px-6">
                  QUANTITY
                </th>
                <th scope="col" className="py-3 px-6">
                  SUBTOTAL
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="bg-white border">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <div className="flex flex-row items-center gap-7">
                      {product?.images && (
                        <div className="w-[50px] h-full bg-white rounded-md">
                          <img
                            src={product?.images[0]?.filePath}
                            className="w-full h-full bg-transparent"
                            alt={product?.collections}
                          />
                        </div>
                      )}
                      {shortenWord(product?.title, 16)}
                    </div>
                  </th>
                  <td className="py-4 px-6">
                    <CurrencyFormat
                      value={product?.newPrice}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"#"}
                      renderText={(value) => (
                        <span className="text-[#000000] text-[18px] leading-[160%] font-normal font-Roboto">
                          {value}
                        </span>
                      )}
                    />
                  </td>
                  <td className="py-4 px-12 items-center justify-center m-auto">
                    <div className="flex flex-row gap-2 justify-center m-auto items-center">
                      <Button
                        ripple={true}
                        onClick={() =>
                          dispatch(decrementQuantity(product?._id))
                        }
                      >
                        
                        <AiOutlineMinus size={12} color="#000000" />
                      </Button>
                      <div
                        style={{
                          border: "1px solid #C0C0C0",
                          padding: "6px 12px",
                          alignItems: "center",
                          justifyContent: "center",
                          borderRadius: "5px",
                        }}
                      >
                        <Typography variant="black" size="heading6">
                          {product?.quantity || 1}
                        </Typography>
                      </div>
                      <Button
                        ripple={true}
                        onClick={() =>
                          dispatch(incrementQuantity(product?._id))
                        }
                      >
                        <AiOutlinePlus size={12} color="#000000" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-6 items-center justify-center m-auto">
                    <div className="flex flex-row items-center justify-center m-auto gap-6">
                      <Typography variant="black" size="heading6">
                        {product?.newPrice * product?.quantity}
                      </Typography>
                      <span className="cursor-pointer">
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          onClick={() => {
                            setComfirmProductDeleteId(product._id);
                            setIsModalOpen(true);
                            console.log("list deleted");
                          }}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {isModalOpen && (
          <ConfirmDelete
            isModalOpen={isModalOpen}
            closeModal={closeModal}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
};

export default CartsTable;
