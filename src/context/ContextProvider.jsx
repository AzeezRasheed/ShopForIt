import React, { createContext, useState } from "react";

const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [shippingLocation, setShippingLocation] = useState("lekki");

  return (
    <Context.Provider value={{ shippingLocation, setShippingLocation }}>
      {children}
    </Context.Provider>
  );
};

export default Context;
