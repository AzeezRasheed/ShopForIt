import React from "react";
const Stack = ({
  direction = "column",
  alignItems = "center",
  className,
  children,
  justifyContent = "center",
}) => {
  const styles = {
    direction: {
      column: "flex-col",
      row: "flex-row",
    },
    justifyContent: {
      start: "justify-start",
      end: "justify-end",
      center: "justify-center",
      spacebetween: "justify-between",
      around: "justify-around",
    },
    alignItems: {
      start: "items-start",
      end: "items-end",
      center: "items-center",
      baseline: "items-baseline",
      stretch: "items-stretch",
    },
  };

  return (
    <div
      className={`flex w-full ${direction && styles.direction[direction]} ${
        justifyContent && styles.justifyContent[justifyContent]
      } ${alignItems && styles.alignItems[alignItems]}  ${className}`}
    >
      {children}
    </div>
  );
};

export default Stack;
