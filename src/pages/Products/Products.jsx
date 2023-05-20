import React, { useState } from "react";
import Stack from "../../components/Stack/Stack";
import { MdViewList, MdWindow } from "react-icons/md";
import Typography from "../../components/Typography/Typography";
import styled from "styled-components";
import tw from "twin.macro";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import Button from "../../components/Button/Button";
import ProductsList from "../../components/ProductsList";
import ProductsGrid from "../../components/ProductsGrid";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const sortLists = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const Box = styled.div`
  ${tw`
p-2 
items-center
justify-center
rounded-[5px]

`}
`;

function Products() {
  const [sortList, setSortList] = useState("");
  const [tab, setTab] = useState("grid");

  const TabPanel = () => {
    switch (tab) {
      case "list":
        return <ProductsList />;
      default:
        return <ProductsGrid />;
    }
  };
  const handleChange = (event) => {
    setSortList(event.target.value);
  };
  return (
    <Stack
      direction="column"
      alignItems="center"
      className="gap-3 px-4 lg:px-14 py-8 "
    >
      <Stack
        direction="row"
        justifyContent="spacebetween"
        alignItems="center"
        className="gap-3 flex flex-wrap py-4 border-b border-solid border-[#D9D9D9] "
      >
        <div className="gap-4 flex items-center ">
          <span className="gap-2 flex ">
            <Button
              ripple={true}
              onClick={() => {
                setTab("grid");
              }}
            >
              <Box
                style={{
                  backgroundColor: tab === "grid" ? "#079627" : "#FFFFFF",
                  border: tab === "grid" ? "none" : "1px solid #9F9F9F",
                }}
              >
                <MdWindow
                  color={`${tab === "grid" ? "#FFFFFF" : "9F9F9F"}`}
                  size={30}
                />
              </Box>
            </Button>
            <Button
              ripple={true}
              onClick={() => {
                setTab("list");
              }}
            >
              <Box
                style={{
                  backgroundColor: tab === "list" ? "#079627" : "#FFFFFF",
                  border: tab === "list" ? "none" : "1px solid #9F9F9F",
                }}
              >
                <MdViewList
                  color={`${tab === "list" ? "#FFFFFF" : "9F9F9F"}`}
                  size={30}
                />
              </Box>
            </Button>
          </span>
          <Typography size="bodyNormal" variant="richBlack">
            Showing 1–12 of 16 results
          </Typography>
        </div>

        <div className="gap-4 flex items-center flex-wrap ">
          <Typography size="bodyNormal" variant="richBlack">
            Sort by:
          </Typography>
          <FormControl sx={{ width: 300 }}>
            <InputLabel id="sort-list-name-label">
              {!sortList ? "Default Sorting" : sortList}
            </InputLabel>
            <Select
              labelId="sort-list-name-label"
              id="sort-list-name"
              value={sortList}
              onChange={handleChange}
              input={<OutlinedInput label="Default Sorting" />}
              MenuProps={MenuProps}
            >
              {sortLists.map((list) => (
                <MenuItem
                  key={list}
                  value={list}
                  // style={}
                >
                  {list}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </Stack>
      <TabPanel />
    </Stack>
  );
}

export default Products;
