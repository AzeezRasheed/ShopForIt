import React, { useEffect, useState } from "react";
import styled from "styled-components";
import tw from "twin.macro";
import TopCollectionData from "./TopCollectionData";
import { useGetProducts } from "../redux/product/productSlice";
import { Circles } from "react-loader-spinner";

const OURTOPCOLLECTION = styled.div`
  ${tw`
 flex flex-col gap-20 items-center w-full h-full m-auto mb-20
`}
`;

const BUTTON = styled.button`
  ${tw`
px-10 py-4 items-center text-center rounded-lg text-[15px] font-normal leading-[18px] font-Roboto
`}
`;

const WIGSBUTTON = styled(BUTTON)`
  ${tw`
 
`}
`;

const EXTENSIONSBUTTON = styled(BUTTON)`
  ${tw`
`}
`;

const ACCESSORIESBUTTON = styled(BUTTON)`
  ${tw`
`}
`;
function TopCollection() {
  const [collection, setCollection] = useState("wigs");
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const products = useGetProducts();
  console.log({ products });
  useEffect(() => {
    const filteredCollection = products.filter((product) =>
      product.collections.toLowerCase().includes(collection.toLowerCase())
    );
    setFilteredProduct(filteredCollection);
    if (filteredProduct) {
      setIsLoading(false);
    }
    return filteredCollection;
  }, [collection, products]);

  return (
    <OURTOPCOLLECTION>
      <div className="flex flex-col gap-2 items-center text-center ">
        <h2 className="font-Montserrat font-semibold text-[32px]  text-white  ">
          Our Top Collection
        </h2>
        <p className="font-Montserrat text-[15px] leading-[24px] font-normal tracking-[0.2px] items-end text-[#EDE1E1] mb-[0.5px] ">
          Browse the collection of the top product
        </p>

        <div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <WIGSBUTTON
              onClick={() => {
                setCollection("wigs");
              }}
              style={{
                backgroundColor: collection === "wigs" ? "#079627" : "#BFE6C8",
                color: collection === "wigs" ? "#FFFFFF" : "#787878",
              }}
            >
              Wigs
            </WIGSBUTTON>
            <EXTENSIONSBUTTON
              onClick={() => {
                setCollection("extensions");
              }}
              style={{
                backgroundColor:
                  collection === "extensions" ? "#079627" : "#BFE6C8",
                color: collection === "extensions" ? "#FFFFFF" : "#787878",
              }}
            >
              Extensions
            </EXTENSIONSBUTTON>
            <ACCESSORIESBUTTON
              onClick={() => {
                setCollection("accessories");
              }}
              style={{
                backgroundColor:
                  collection === "accessories" ? "#079627" : "#BFE6C8",
                color: collection === "accessories" ? "#FFFFFF" : "#787878",
              }}
            >
              Accessories
            </ACCESSORIESBUTTON>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="items-center text-center m-auto flex justify-center ">
          <Circles color="#FFFFFF" height="100" width="100" visible />
        </div>
      ) : (
        <div className="justify-center align-middle flex items-center m-auto w-full h-full ">
          <div className="flex flex-wrap gap-6 items-center justify-center w-full ">
            {filteredProduct && (
              <>
                {filteredProduct.map((data, i) => (
                  <div className="flex flex-col items-center text-center justify-start mb-6">
                    <div className="w-[215px] h-[225px] items-center  mb-2 ">
                      <img
                        src={data?.images[0]?.filePath}
                        alt="..."
                        className="w-full h-full"
                      />
                    </div>
                    <h2 className="font-Roboto font-normal leading-[19px] text-center text-[16px] text-white w-full max-w-[201px] mb-1.5 ">
                      {data?.title}
                    </h2>
                    <h2 className="font-Roboto font-normal leading-[19px] text-center text-[16px] text-white w-full max-w-[201px] mb-1.5 ">
                      {data?.descriptions[0].value}
                    </h2>
                    <span
                      style={{ textDecoration: "line-through" }}
                      className=" text-[#CFCFCF] text-center text-[14px] leading-[16px] font-light font-Roboto mb-1.5  "
                    >
                      {data?.oldPrice}
                    </span>
                    <span className=" text-white text-center text-[14px] leading-[16px] font-light font-Roboto  ">
                      {data?.newPrice}
                    </span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </OURTOPCOLLECTION>
  );
}

export default TopCollection;
