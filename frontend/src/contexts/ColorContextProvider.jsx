import React from "react";

export const ColorContext = React.createContext();

const ColorContextProvider = ({ children }) => {
  const c1 = "#87c8c9";
  const c2 = "#72bec0";
  const c3 = "#5db4b6";
  const c4 = "#4ca7a9";
  const c5 = "#429294";
  const c6 = "#397d7f";
  return (
    <ColorContext.Provider value={{ c1, c2, c3, c4, c5, c6 }}>
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContextProvider;
