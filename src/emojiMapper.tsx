import React from "react";
import Emoji from "./Emoji";

const emojiMap = {
  enter: "🏹",
  delete: "🔙",
  restart: "♻",
  start: "🎰",
  clear: "🔚",
};

const emojiMapper = (
  action: "enter" | "delete" | "restart" | "start" | "clear"
) => {
  return <Emoji symbol={emojiMap[action]} label={action} />;
};
export default emojiMapper;
