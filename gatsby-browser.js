import React from "react";
//context
import Context from 'context/';

const wrapRootElement = ({ element }) => {
  return (
    <Context>{element}</Context>
  );
};

export { wrapRootElement };