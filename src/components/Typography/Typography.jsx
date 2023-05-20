import React from "react";

const Typography = ({
  size = "base",
  variant = "black",
  as = "p",
  className,
  children,
}) => {
  const Tag = as;

  const sizes = {
    sm: "font-medium text-sm leading-normal",
    base: "font-medium  leading-normal",
    lg: "font-semibold text-lg md:text-2xl leading-relaxed",
    heading1:
      "font-extrabold text-[48px] leading-[130%] tracking-[-0.01em] font-Montserrat  ",
    heading2:
      "font-medium text-[36px] leading-[130%] tracking-[-0.01em] font-Montserrat  ",
    heading3: "font-medium text-[28px] leading-[130%] font-Montserrat ",
    heading4: "font-extrabold text-[24px] leading-[130%] font-Montserrat  ",
    heading5: "font-extrabold text-[20px] leading-[130%] font-Montserrat  ",
    heading6: "font-normal text-[16px] leading-[130%] font-Montserrat",
    leadParagraph: "font-normal text-[22px] leading-[150%] font-Roboto ",
    bodyLarge: "font-normal text-[20px] leading-[170%] font-Roboto ",
    bodyMedium: "font-bold text-[18px] leading-[160%] font-Roboto ",
    bodyNormal: "font-normal text-[15px] leading-[24px]  font-Roboto ",
    bodySmall: "font-bold text-[14px] leading-[170%] font-Roboto  ",
    bodySmallLight: "font-normal text-[14px] leading-[130%]  font-Roboto ",
    buttons: "font-medium text-[16px] leading-[16px] font-Roboto ",
    smallerText: "font-normal text-[12px] leading-[16px] font-Roboto ",
    lightText: "font-light text-[14px] leading-[16px] font-Roboto ",
    cardLabel: "font-medium text-[15px] leading-[26px] font-Roboto",
  };

  const variants = {
    white: "text-[#FFFFFF]",
    brandColor: "text-[#033514]",
    black: "text-[#000000] ",
    grey: "text-[#D9D9D9]",
    brown: "text-[#262626]",
    bold: "text-[#1C1C1C]",
    darkGreen: "text-[#034C1C]",
    richBlack: "text-[#0C0C0C]",
    grey2: "text-[#C0C0C0]",
    grey3: "text-[#9F9F9F]",
    label: "text-[#272727]",
  };

  return (
    <Tag
      className={`${size && sizes[size]} ${
        variants && variants[variant]
      } ${className}  `}
    >
      {children}
    </Tag>
  );
};

export default Typography;
