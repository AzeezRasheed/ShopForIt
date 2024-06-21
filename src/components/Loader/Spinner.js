import React from "react";
import { ThreeDots } from "react-loader-spinner";

function Spinner() {
  return (
    <div
      style={{
        zIndex: 9,
      }}
      className="fixed bg-[#8B80B6] bg-opacity-10  w-screen h-screen"
    >
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 999,
        }}
      >
        <ThreeDots
          type="ThreeDots"
          color="#2BAD60"
          height="100"
          width="100"
          visible
        />
      </div>
    </div>
  );
}

export default Spinner;
