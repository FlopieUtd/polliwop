import { useCallback, useEffect, useState } from "react";
import "./App.css";
import { Die } from "./components/Die/Die";
import {
  initializeGoogleAnalytics,
  trackGoogleAnalyticsEvent,
} from "./utils/ga4";

const getDiceCoordinates = function (
  n: number,
  circleSize: number
): [number, number][] {
  if (n === 4) {
    return [
      [-70, -70],
      [-70, 70],
      [70, -70],
      [70, 70],
    ];
  }

  if (n === 2) {
    return [
      [0, -70],
      [0, 70],
    ];
  }

  if (n === 1) {
    return [[0, 0]];
  }

  const theta: number[] = [];

  const frags = 360 / n;
  for (let i = 0; i <= n; i++) {
    theta.push((frags / 180) * i * Math.PI);
  }

  const coordinates: [number, number][] = [];

  for (let i2 = 0; i2 < n; i2++) {
    coordinates.push([
      Math.round(circleSize * Math.cos(theta[i2])),
      Math.round(circleSize * Math.sin(theta[i2])),
    ]);
  }

  return coordinates;
};

const App = () => {
  const [startTime, setStartTime] = useState("");
  const [diceLeft, setDiceLeft] = useState(5);
  const [roll, setRoll] = useState(0);
  const [coordinates, setCoordinates] = useState<[number, number][]>([]);
  const [showFaces, setShowFaces] = useState(false);
  const [round, setRound] = useState(1);

  const handleRoll = useCallback(() => {
    if (round === 1 && roll === 0) {
      setStartTime(new Date().toLocaleTimeString());
    }

    trackGoogleAnalyticsEvent("action", "roll", "test");

    setRoll(roll + 1);
    setShowFaces(true);
  }, [roll, round]);

  const handleDecrement = useCallback(() => {
    if (diceLeft > 0) {
      setDiceLeft(diceLeft - 1);
      setShowFaces(false);
    }
  }, [diceLeft]);

  const handleIncrement = useCallback(() => {
    if (diceLeft < 5) {
      setDiceLeft(diceLeft + 1);
      setShowFaces(false);
    }
  }, [diceLeft]);

  const handleReset = useCallback(() => {
    setRound(round + 1);
    setRoll(0);
    setDiceLeft(5);
    setShowFaces(false);
  }, [round]);

  const canRoll = diceLeft > 0;
  const canIncrement = diceLeft < 5 && diceLeft !== 0;
  const canDecrement = diceLeft > 0;

  const isFresh = roll === 0 && round === 1;

  useEffect(() => {
    initializeGoogleAnalytics();
  }, []);

  useEffect(() => {
    setCoordinates(getDiceCoordinates(diceLeft, diceLeft === 5 ? 115 : 80));
  }, [diceLeft]);

  useEffect(() => {
    const documentHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty("--doc-height", `${window.innerHeight}px`);
    };
    window.addEventListener("resize", documentHeight);
    documentHeight();
  }, []);

  return (
    <div className="App">
      {isFresh && <h1 className="title">Let's play Perudo!</h1>}
      <div className="stats-wrapper">
        {(roll > 0 || round > 1) && (
          <div className="stats">
            <div>Started at {startTime}</div>
            <div>Round {round}</div>
            {roll > 0 && <div>Roll {roll}</div>}
          </div>
        )}
      </div>
      <div className="main">
        {diceLeft === 0 && <div className="game-over">Game over!</div>}
        <div className="dice-container">
          {coordinates.map((coordinate, index) => (
            <Die
              key={JSON.stringify(coordinate)}
              roll={roll}
              coordinate={coordinate}
              animationLength={
                roll === 0 ? 0 : 1200 - diceLeft * 100 + index * 10
              }
              showFaces={showFaces}
            />
          ))}
        </div>
      </div>
      <div className="controls-wrapper">
        <div className="controls">
          <div className="controls-row">
            <button
              onClick={handleRoll}
              disabled={!canRoll}
              className={isFresh ? "pulse" : ""}
            >
              Roll
            </button>
          </div>
          <div className="controls-row">
            <button onClick={handleIncrement} disabled={!canIncrement}>
              +
            </button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleDecrement} disabled={!canDecrement}>
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
