import React from "react";
import { useCallback, useEffect, useState } from "react";
import Keypad from "./Keypad";
import emojiMapper from "./emojiMapper";
import { Brain } from "./Brain";

const CONFIG = {
  maxAttempts: 10,
};
const brain = new Brain({
  max: 100,
  attempts: 10,
});
const isNumber = (value: string) => {
  return !Number.isNaN(Number(value));
};

const Game = () => {
  const [started, setStarted] = useState(false);
  const [guess, setGuess] = useState("");
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [attempts, setAttempts] = useState<
    Array<{ number: number; message: string }>
  >([]);

  const addAttempt = (number: number, message: string) => {
    setAttempts((prevState) => [...prevState, { number, message }]);
  };
  const restart = () => {
    setMessage("");
    setCount(0);
    setAttempts([]);
    brain.start();
  };
  const checkGuess = () => {
    const message = brain.checkNumber(Number(guess)) || "";
    setMessage(message);
    addAttempt(Number(guess), message);
    setCount((count) => count + 1);
    setGuess("");
  };

  const actionReducer = (
    action: "delete" | "clear" | "input" | "enter",
    value?: string
  ) => {
    switch (action) {
      case "delete":
        return setGuess((prevState) => prevState.slice(0, -1));
      case "clear":
        return setGuess("");
      case "input": {
        return setGuess((prevState) => `${prevState}${value}`);
      }
      case "enter": {
        return checkGuess();
      }
    }
  };
  const handleKeypress = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        return actionReducer("enter");
      }
      if (e.key === "Backspace") return actionReducer("delete");
      if (isNumber(e.key)) return actionReducer("input", e.key);
    },
    [actionReducer]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeypress, false);
    return () => window.removeEventListener("keydown", handleKeypress, false);
  }, [guess]);

  useEffect(() => {
    if (count >= CONFIG.maxAttempts) {
    }
  }, [count]);

  if (!started)
    return (
      <div className="container">
        <div className="centered">
          <button
            type="button"
            onClick={() => {
              brain.start();
              setStarted(true);
            }}
          >
            {emojiMapper("start")}
            <p>Start game</p>
          </button>
        </div>
      </div>
    );

  return (
    <div className="game">
      <div className="screen">
        <form>
          <div className="hint">{message}</div>

          <input
            disabled
            type="number"
            value={guess}
            onChange={(e) => {
              e.preventDefault();
              setGuess(e.target.value);
            }}
          />
        </form>
      </div>

      <Keypad
        chars={"1234567890"}
        actions={["delete", "clear", "enter"]}
        keyHandler={handleKeypress}
        clickHandler={actionReducer}
      />
      <div className="controls">
        <button type="button" onClick={() => restart()}>
          {emojiMapper("restart")}
        </button>
      </div>
      <div className="attempt-list">
        <p>🎯: {CONFIG.maxAttempts - count}</p>
        <ul>
          {attempts.map((a, i) => (
            <li key={i}>
              {i + 1}) {a.number} - {a.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Game;
