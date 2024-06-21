import React from "react";
import { AiTwotoneStar } from "react-icons/ai";
import Typography from "./Typography/Typography";

const StarRating = ({ rating }) => {
  // Round the rating to the nearest half
  const roundedRating = Math.round(rating * 2) / 2;

  // Create an array of stars based on the rounded rating
  const stars = Array.from({ length: 5 }, (_, index) => (
    <AiTwotoneStar
      key={index}
      size={20}
      color={index < roundedRating ? "#F75E54" : "#D1D5DB"}
    />
  ));

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {stars}
      <Typography size="heading6" className="text-[#F75E54]">
        {rating || rating !== null ? rating : 0} Reviews
      </Typography>
    </div>
  );
};

export default StarRating;
