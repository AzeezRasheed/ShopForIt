import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const LoadingSpinner = () => (
  <div className="flex items-center justify-center m-auto py-6">
    <InfinitySpin
      visible={true}
      width="200"
      color="#4fa94d"
      ariaLabel="infinity-spin-loading"
    />{" "}
  </div>
);

export default LoadingSpinner;
