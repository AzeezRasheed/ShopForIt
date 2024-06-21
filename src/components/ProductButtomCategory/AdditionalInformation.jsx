import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Table = styled.table`
  ${tw`
w-full text-start 
`}
`;
const TableHead = styled.thead`
  ${tw`
uppercase  text-start  border border-[#CFCFCF]
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
px-6 py-3 text-[#000000]  text-start
`}
`;
const TableData = styled.td`
  ${tw`
px-6 py-4 text-[#000000] text-start border border-[#CFCFCF]
`}
`;

const AdditionalInformation = ({ product }) => {
  const formattedCategories = product?.categories.map(
    (category) => `${category} Inches`
  );

  const formattedCategoryString = formattedCategories.join(", ");
  return (
    <div className="relative overflow-x-auto">
      {product && product?.additionalInfo ? (
        <Table>
          <TableHead
            style={{
              backgroundColor: "#F5F5F5",
            }}
          >
            <TableRow>
              <TableTop scope="col" style={{ textAlign: "center" }}>
                Stretched Length
              </TableTop>

              <TableTop
                scope="col"
                style={{
                  width: "100%",
                  maxWidth: "415px",
                  textAlign: "start",
                }}
              >
                {formattedCategoryString}
              </TableTop>
            </TableRow>
          </TableHead>
          <TableBody>
            {/*  */}
            {product && product?.additionalInfo && (
              <>
                {product?.additionalInfo.map((additionalInfo) => (
                  <TableRow>
                    <TableTop style={{ padding: "6px 4px" }}>
                      {additionalInfo?.name}
                    </TableTop>
                    <TableData>{additionalInfo?.value}</TableData>
                  </TableRow>
                ))}
              </>
            )}
          </TableBody>
        </Table>
      ) : (
        <p>no additional information</p>
      )}
    </div>
  );
};

export default AdditionalInformation;
