import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import DOMPurify from "dompurify";
// import useRedirectLoggedOutUsers from "../../customHooks/useRedirectLoggedOutUsers";
// import { getProduct } from "../../redux/product/productSlice";
import { BsArrowRight } from "react-icons/bs";
import Spinner from "../../../components/Loader/Spinner";
import { getProduct } from "../../../redux/product/productSlice";
import styled from "styled-components";
import tw from "twin.macro";
// import Typography from "../../../components/Typography/Typography";

const Table = styled.table`
  ${tw`
w-full text-start
`}
`;
const TableHead = styled.thead`
  ${tw`
uppercase  text-start
`}
`;

const TableRow = styled.tr`
  ${tw`
 text-start
`}
`;

const TableTop = styled.th`
  ${tw`
px-6 py-3 text-[#000000] text-center border border-[#CFCFCF]
`}
`;

const TableBody = styled.tbody`
  ${tw`
px-6 py-3 text-[#000000] items-center text-start
`}
`;
const TableData = styled.td`
  ${tw`
px-6 py-4 text-[#000000] text-start border border-[#CFCFCF]
`}
`;

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // useRedirectLoggedOutUsers("/login");

  // const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProduct(id));

    if (isError) {
      console.log(message);
    }
  }, [isError, message, dispatch, id]);

  const stockStatus = (quantity) => {
    if (quantity > 0) {
      return <span className="text-green-700">In Stock</span>;
    }
    return <span className="text-red-700">Out Of Stock</span>;
  };

  return (
    <div className="flex flex-col max-w-[500px] gap-2 shadow-lg shadow-indigo-500/50 bg-white p-2 lg:p-4">
      <h2 className="font-semi-bold text-[30px] font-serif text-center md:text-start lg:text-start ">
        Product Detail
      </h2>
      {isLoading && <Spinner />}
      <div className="flex flex-col gap ">
        <div className="flex flex-col gap">
          {product?.images ? (
            <>
              {product?.images?.map((image) => (
                <div className="image-preview transition flex items-center justify-center md:items-start md:justify-start lg:items-start lg:justify-start flex-wrap py-3 mb-3">
                  <img
                    src={image.filePath}
                    alt={image?.name}
                    className="max-w-full h-auto shadow-lg"
                  />
                </div>
              ))}
            </>
          ) : (
            <p>No image set for this product.</p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row md:flex-row  gap-2 items-center">
          <label className=" uppercase  tracking-wide text-slate-700 font-semi-bold  ">
            Product Availability :
          </label>
          <p className="text-lg font-serif ">
            <b> {stockStatus(product?.quantity)} </b>
          </p>
        </div>
      </div>
      <hr className="text-[4px] font-bold  " />
      <div className="flex flex-col md:flex-row lg:flex-row  gap-2 items-center">
        <label className=" uppercase tracking-wide bg-yellow-400 text-white font-bold flex-shrink-0  text-sm border-4 py-1 px-2 rounded ">
          Title :
        </label>
        <p className="text-lg font-serif ">
          <b> {product?.title} </b>
        </p>
      </div>
      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className="text-sm uppercase tracking-wide text-black font-bold  ">
          Collection :
        </label>
        <p className="text-lg text-slate-600  ">
          <b> {product?.collections} </b>
        </p>
      </div>
      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className=" text-sm uppercase tracking-wide text-black font-bold  ">
          Old Price :
        </label>
        <p className="text-lg text-slate-600  ">
          <b>
            {"$"}
            {product?.oldPrice}
          </b>
        </p>
      </div>
      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className=" text-sm uppercase tracking-wide text-black font-bold  ">
          New Price :
        </label>
        <p className="text-lg text-slate-600  ">
          <b>
            {"$"}
            {product?.newPrice}
          </b>
        </p>
      </div>
      <div className="flex flex-wrap gap-2 items-center text-center">
        <div className="flex gap-1 items-center">
          <BsArrowRight />
          <label className=" text-sm uppercase tracking-wide text-black font-bold  ">
            Stretched Length:
          </label>
        </div>

        {product?.categories && (
          <>
            {product?.categories.map((category) => (
              <div className="text-lg text-slate-600">{category} Inches</div>
            ))}
          </>
        )}
      </div>
      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className=" uppercase text-sm tracking-wide text-black font-bold  ">
          Quantity in stock :
        </label>
        <p className="text-lg text-slate-600  ">
          <b> {product?.quantity} </b>
        </p>
      </div>
      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className=" uppercase text-sm  tracking-wide text-black font-bold  ">
          Total value in stock :
        </label>
        <p className="text-lg text-slate-600  ">
          <b>
            {"$"}
            {product?.oldPrice * product?.quantity}
          </b>
        </p>
      </div>

      <div className="flex flex-row  gap-1 lg:gap-2 md:gap-2 items-center">
        <BsArrowRight />
        <label className=" uppercase text-sm tracking-wide text-black font-bold  ">
          Event Type :
        </label>
        <p className="text-lg text-slate-600  ">
          <b> {product?.event} </b>
        </p>
      </div>

      <hr className="text-[4px] font-bold  " />
      {product?.descriptions && (
        <div className="flex flex-col  gap-2">
          <div className="flex flex-row items-center gap-2">
            <BsArrowRight />
            <label className=" uppercase text-sm  tracking-wide text-black font-bold  ">
              Descriptions :
            </label>
          </div>
          <div className="relative overflow-x-auto">
            {product && product?.descriptions ? (
              <Table>
                <TableHead
                  style={{
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <TableRow>
                    <TableTop scope="col">Materials</TableTop>
                    <TableTop scope="col" style={{ textAlign: "left" }}>
                      Value
                    </TableTop>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {product?.descriptions.map((description) => {
                    return (
                      <TableRow key={description?._id}>
                        <TableTop style={{ padding: "6px 4px" }}>
                          {description?.name}
                        </TableTop>
                        <TableData>{description?.value}</TableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <p>no description</p>
            )}
          </div>
        </div>
      )}
      {product?.additionalInfo && (
        <div className="flex flex-col  gap-2">
          <div className="flex flex-row items-center gap-2">
            <BsArrowRight />
            <label className=" uppercase text-sm  tracking-wide text-black font-bold  ">
              Additional Info :
            </label>
          </div>
          <div className="relative overflow-x-auto">
            {product && product?.additionalInfo ? (
              <Table>
                <TableHead
                  style={{
                    backgroundColor: "#F5F5F5",
                  }}
                >
                  <TableRow>
                    <TableTop scope="col">Materials</TableTop>
                    <TableTop scope="col" style={{ textAlign: "left" }}>
                      Value
                    </TableTop>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {product?.additionalInfo.map((info) => {
                    return (
                      <TableRow key={info?._id}>
                        <TableTop style={{ padding: "6px 4px" }}>
                          {info?.name}
                        </TableTop>
                        <TableData>{info?.value}</TableData>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            ) : (
              <p>no additional information</p>
            )}
          </div>
        </div>
      )}
      <hr className="text-[4px] font-bold   " />
      <div>
        <code className="--color-dark">
          Created on: {product?.createdAt?.toLocaleString("en-US")}
        </code>
        <br />
        <code className="--color-dark">
          Last Updated: {product?.updatedAt?.toLocaleString("en-US")}
        </code>
      </div>
    </div>
  );
}

export default ProductDetail;
