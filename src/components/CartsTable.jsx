import React, { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { InfinitySpin } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/product/productSlice";
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
import ConfirmDelete from "./ConfirmDelete";

const CartsTable = () => {
  const dispatch = useDispatch();
  const cart = useGetCart();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmProductDeleteId, setConfirmProductDeleteId] = useState("");

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  const handleDelete = async () => {
    await dispatch(removeItem(confirmProductDeleteId));
    await dispatch(getProducts());
    toggleModal();
  };

  const shortenWord = (name, num) =>
    name?.length > num ? `${name.substring(0, num)}...` : name;

  return (
    <div className="overflow-x-auto">
      {cart?.length < 1 ? (
        <div className="items-center py-3 mx-auto flex justify-center m-auto">
          <InfinitySpin
            visible={true}
            width="200"
            color="#4fa94d"
            ariaLabel="infinity-spin-loading"
          />
        </div>
      ) : (
        <table className="text-sm text-left text-black font-bold">
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
            {cart.map((cartItem) => {
              const { item, quantity } = cartItem;
              return (
                <tr key={item._id} className="bg-white border">
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap"
                  >
                    <div className="flex flex-row items-center gap-7">
                      {item.images && (
                        <div className="w-[50px] h-full bg-white rounded-md">
                          <img
                            src={item.images[0]?.filePath}
                            className="w-full h-full bg-transparent"
                            alt={item.collections}
                          />
                        </div>
                      )}
                      {shortenWord(item.title, 16)}
                    </div>
                  </th>
                  <td className="py-4 px-6">
                    <CurrencyFormat
                      value={item.newPrice}
                      displayType="text"
                      thousandSeparator={true}
                      prefix="#"
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
                        onClick={() => dispatch(decrementQuantity(item._id))}
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
                          {quantity || 1}
                        </Typography>
                      </div>
                      <Button
                        ripple={true}
                        onClick={() => dispatch(incrementQuantity(item._id))}
                      >
                        <AiOutlinePlus size={12} color="#000000" />
                      </Button>
                    </div>
                  </td>
                  <td className="py-4 px-6 items-center justify-center m-auto">
                    <div className="flex flex-row items-center justify-center m-auto gap-6">
                      <Typography variant="black" size="heading6">
                        {item.newPrice * quantity}
                      </Typography>
                      <span className="cursor-pointer">
                        <FaTrashAlt
                          size={20}
                          color="red"
                          onClick={() => {
                            setConfirmProductDeleteId(item._id);
                            toggleModal();
                          }}
                        />
                      </span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {isModalOpen && (
        <ConfirmDelete
          isModalOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default CartsTable;
