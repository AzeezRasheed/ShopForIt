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

const Description = ({ product }) => {
  return (
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
                Curly Hair Extensions
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
  );
};

export default Description;
