import React, { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";

const sortOptions = ["price : low to high", "price : high to low"];

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

const HandleSortingOptions = ({ onSortChange }) => {
  const [sortOption, setSortOption] = useState("price : low to high");

  const handleSortChange = (event) => {
    const selectedSortOption = event.target.value;
    setSortOption(selectedSortOption);
    onSortChange(selectedSortOption);
  };
  return (
    <div className="gap-4 flex items-center flex-wrap">
      <h2 className="text-[16px] text-[#000] font-[400] font-OpenSans">
        Sort by:
      </h2>

      <FormControl sx={{ width: "194px" }} size="small">
        <InputLabel id="sort-list-name-label">{sortOption}</InputLabel>
        <Select
          labelId="sort-list-name-label"
          id="sort-list-name"
          value={sortOption}
          onChange={handleSortChange}
          input={<OutlinedInput label="Default Sorting" />}
          MenuProps={MenuProps}
        >
          {sortOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default HandleSortingOptions;
