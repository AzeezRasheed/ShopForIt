import React from "react";
import tw from "twin.macro";
import { FaShippingFast } from "react-icons/fa";
import { GrTrophy } from "react-icons/gr";
import { MdOutlineSupportAgent } from "react-icons/md";

const data = [
  {
    icon: <GrTrophy size={"60px"} />,
    title: "High Quality",
    description: "crafted from top materials",
  },

  {
    icon: <FaShippingFast size={"60px"} />,
    title: "Free Shipping",
    description: "Order over ₦150,000",
  },
  {
    icon: <MdOutlineSupportAgent size={"60px"} />,
    title: "24 / 7 Support",
    description: "Dedicated support",
  },
];

function InfoBox() {
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        {data.map((data, i) => (
          <div key={i} style={styles.box}>
            <span style={styles.icon}>{data.icon}</span>
            <div style={styles.rightBox} key={i}>
              <h2 style={styles.title}>{data.title}</h2>
              <p style={styles.description}>{data.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InfoBox;

const styles = {
  icon: tw`text-[#242424]`,
  box: tw`flex flex-row items-center gap-5`,
  rightBox: tw` flex flex-col items-start text-start gap-[2px] `,
  title: tw`font-Poppins font-[600] text-[25px] text-[#242424] `,
  description: tw`font-[500] font-Poppins text-[20px] text-[#898989]  `,
  container: tw`flex items-start justify-start  m-auto w-full `,
  innerContainer: tw`flex flex-wrap justify-center gap-10  m-auto py-20`,
};
