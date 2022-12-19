import React from "react";
const Emoji = ({ label, symbol }: any) => {
  return (
    <span
      className="emoji"
      role="img"
      aria-label={label ? label : ""}
      aria-hidden={label ? "false" : "true"}
      style={{ fontSize: "large" }}
    >
      {symbol}
    </span>
  );
};

export default Emoji;
