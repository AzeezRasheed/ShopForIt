import React from "react";
import Stack from "../Stack/Stack";
import Typography from "../Typography/Typography";

const Reviews = () => {
  return (
    <div
      className="w-full max-w-[682px] px-1 py-8  "
      style={{
        border: "0.5px solid #CFCFCF",
      }}
    >
      <Stack
        direction="column"
        alignItems="start"
        className={"gap-2 text-start"}
      >
        <Typography variant="black" size="heading6">
          There are no reviews yet.
        </Typography>
        <Typography variant="black" size="heading6">
          Only logged in customers who have purchased this product may leave a
          review.
        </Typography>
      </Stack>
    </div>
  );
};

export default Reviews;
