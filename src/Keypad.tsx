import React from "react";
import emojiMapper from "./emojiMapper";

const Keypad = ({
  chars,
  actions,
  clickHandler,
  keyHandler,
}: {
  chars: string;
  actions: Array<"enter" | "delete" | "clear">;
  clickHandler: any;
  keyHandler: any;
}) => {
  return (
    <div className="keypad" tabIndex={0}>
      {chars.split("").map((char: string, i) => {
        return (
          <button
            key={i}
            type="button"
            className={`keypad-char btn${char} up`}
            onClick={() => clickHandler("input", char)}
          >
            {char}
          </button>
        );
      })}
      {actions.map((action, i) => (
        <button
          key={i}
          type="button"
          className={`${action}-btn up`}
          onClick={() => clickHandler(action)}
        >
          {emojiMapper(action)}
        </button>
      ))}
    </div>
  );
};

export default Keypad;
