import React from "react";
import { useCallback, useEffect, useState } from "react";
import Keypad from "./Keypad";
import emojiMapper from "./emojiMapper";

const CONFIG = {
  maxAttempts: 10,
};

const getMessage = (guess: string, rnd: number, lastGuess: number): string => {
  // console.log(`getMessage(${guess}, ${rnd}, ${lastGuess}`);
  let message: "Hot" | "Warm" | "Cold" | "Bingo" = "Cold";
  // if (!Number.isInteger(guess)) return "";
  const guessNo = Number(guess);

  const diff1 = Math.abs(rnd - guessNo);
  const diff2 = Math.abs(rnd - lastGuess);

  switch (true) {
    case diff1 === 0:
      message = "Bingo";
      break;
    case diff1 < 10:
      message = "Hot";
      break;
    case diff1 <= 50:
      message = "Warm";
      break;
    case diff1 > 50:
      message = "Cold";
      break;
    default:
      break;
  }
  console.log(diff1, diff2, Math.abs(diff1 - diff2));
  return diff1 < diff2 && Math.abs(diff1 - diff2) <= 10
    ? betterMessage(message)
    : message;
};

const getRandom = (max: number) => {
  return Math.floor(Math.random() * max);
};

const betterMessage = (message: "Hot" | "Warm" | "Cold" | "Bingo") => {
  if (message === "Hot") return "Hotter";
  if (message === "Warm") return "Warmer";
  if (message === "Cold") return "Colder";
  if (message === "Bingo") return "Bingo";
  return "";
};
const isNumber = (value: string) => {
  return !Number.isNaN(Number(value));
};

const Game = () => {
  const [guess, setGuess] = useState("");
  const [started, setStarted] = useState(false);
  const [rnd, setRnd] = useState(getRandom(100));
  const [count, setCount] = useState<number>(0);
  const [message, setMessage] = useState<string>("");
  const [lastGuess, setLastGuess] = useState<number>(rnd);
  const [attempts, setAttempts] = useState<
    Array<{ number: number; message: string }>
  >([]);

  const addAttempt = (number: number, message: string) => {
    setAttempts((prevState) => [...prevState, { number, message }]);
  };

  const startGame = () => {
    let generatedNumber = getRandom(100);
    setRnd(generatedNumber);
    setCount(0);
    setMessage("");
    setAttempts([]);
    setLastGuess(generatedNumber);
  };

  const checkGuess = () => {
    console.log(`getMessage(${guess}, ${rnd}, ${lastGuess}`);

    const message = getMessage(guess, rnd, lastGuess);
    setMessage(message);
    setLastGuess(Number(guess || rnd));
    addAttempt(Number(guess), message);
    setCount((count) => count + 1);
    setGuess("");
  };

  const actionReducer = (
    action: "delete" | "clear" | "input" | "enter",
    value?: string
  ) => {
    // console.log(`action: ${action}, value: ${value}`);

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
    if (count >= CONFIG.maxAttempts) return alert("no more tries");
  }, [count]);

  useEffect(() => {
    startGame();
  }, [started]);

  if (!started)
    return (
      <div className="container">
        <div className="centered">
          <button type="button" onClick={() => setStarted(true)}>
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
        <button type="button" onClick={() => startGame()}>
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
