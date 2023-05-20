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

const AdditionalInformation = () => {
  return (
    <div className="relative overflow-x-auto">
      <Table>
        <TableHead
          style={{
            backgroundColor: "#F5F5F5",
          }}
        >
          <TableRow>
            <TableTop scope="col" style={{ textAlign: "center", }}>
              Stretched Length
            </TableTop>
            <TableTop
              scope="col"
              style={{ width: "100%", maxWidth: "415px", textAlign: "start" }}
            >
              18 Inches, 20 Inches, 26 Inches, 24 Inches, 22 Inches, 28 Inches,
              14 Inches, 16 Inches, 10 Inches, 12 Inches.
            </TableTop>
          </TableRow>
        </TableHead>
        <TableBody>
          {/*  */}
          <TableRow>
            <TableTop style={{ padding: "6px 4px" }}>Color</TableTop>
            <TableData>Customized</TableData>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AdditionalInformation;
