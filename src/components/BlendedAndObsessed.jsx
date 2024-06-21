import React from "react";
import tw from "twin.macro";
import Typography from "./Typography/Typography";

const BlendedAndObsessed = () => {
  return (
    <div style={styles.container}>
      {/* top */}
      <div style={styles.textContainer}>
        <Typography
          variant="white"
          className={
            "md:text-[40px] text-[25px] font-normal capitalize font-Artifika leading-tight  "
          }
        >
          Blended & obsessed
        </Typography>
        <Typography
          variant="white"
          className={"text-[16px] font-normal capitalize font-Montserrat   "}
        >
          2600 + Reviews and Request from our Amazing clients just like you.
        </Typography>
      </div>
      {/* bottom */}
      <Typography
        variant="white"
        className={"text-[16px] font-normal capitalize font-Montserrat   "}
      >
        2600 + Reviews and Request from our Amazing clients just like you.
      </Typography>
    </div>
  );
};

export default BlendedAndObsessed;

const styles = {
  container: tw`flex flex-col w-full items-center  text-center m-auto bg-[#033514] gap-5 px-4 py-10 `,
  textContainer: tw`flex flex-col items-center m-auto  gap-4 `,
};
