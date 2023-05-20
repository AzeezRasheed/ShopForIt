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

const Description = () => {
  return (
    <div className="relative overflow-x-auto">
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
          <TableRow>
            <TableTop style={{ padding: "6px 4px" }}>Tape Size</TableTop>
            <TableData>0.8cm x 4cm</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableTop style={{ padding: "6px 4px" }}>Color</TableTop>
            <TableData>Natural, it can be custom into any color</TableData>
          </TableRow>
          {/*  */}
          <TableRow>
            <TableTop style={{ padding: "6px 4px" }}>Package</TableTop>
            <TableData>Customized Brand Sour-vernier</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Description;
