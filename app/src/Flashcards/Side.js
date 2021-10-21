import * as React from "react";

const Side = ({ text, toggleSide }) => {
  return <button onClick={toggleSide}>{text}</button>;
};
export default Side;
