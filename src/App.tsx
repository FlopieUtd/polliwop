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
      trackGoogleAnalyticsEvent("action", "start_game", "");
    }

    trackGoogleAnalyticsEvent("action", "roll", "");

    setRoll(roll + 1);
    setShowFaces(true);
  }, [roll, round]);

  const handleDecrement = useCallback(() => {
    if (diceLeft > 0) {
      setDiceLeft(diceLeft - 1);
      setShowFaces(false);
      trackGoogleAnalyticsEvent("action", "decrement", "");
    }
  }, [diceLeft]);

  const handleIncrement = useCallback(() => {
    if (diceLeft < 5) {
      setDiceLeft(diceLeft + 1);
      setShowFaces(false);
      trackGoogleAnalyticsEvent("action", "increment", "");
    }
  }, [diceLeft]);

  const handleReset = useCallback(() => {
    setRound(round + 1);
    setRoll(0);
    setDiceLeft(5);
    setShowFaces(false);
    trackGoogleAnalyticsEvent("action", "reset", "");
  }, [round]);

  const canRoll = diceLeft > 0;
  const canIncrement = diceLeft < 5 && diceLeft !== 0;
  const canDecrement = diceLeft > 0;

  const isFresh = roll === 0 && round === 1 && diceLeft === 5;

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
    <>
      <div className="w-full h-full flex flex-col max-w-[480px] relative">
        {isFresh && (
          <h1 className="w-full text-center text-[20px] mt-[24px] absolute font-bold">
            let's playz
            <br />
            <span className="text-[96px] font-aztec font-normal leading-[84px]">
              perudo
            </span>
          </h1>
        )}

        <div className="w-full flex justify-center min-h-[100px]">
          {(roll > 0 || round > 1) && (
            <div className="p-[12px] w-full max-w-[480px] text-[#555] origin-center">
              <div>Started at {startTime}</div>
              <div>Round {round}</div>
              {roll > 0 && <div>Roll {roll}</div>}
            </div>
          )}
        </div>
        <div className="w-full h-full flex items-center justify-center">
          {diceLeft === 0 && (
            <div className="text-[40px] text-[#555] uppercase tracking-[5px] break-words">
              Game over!
            </div>
          )}
          <div className="dice-container relative w-0 h-0 -rotate-90">
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
        <div className="w-full flex justify-center">
          <div className="w-full flex max-w-[480px] flex-col">
            <div className="w-full flex gap-[12px] pb-[12px] px-[12px] box-border">
              <button
                onClick={handleRoll}
                disabled={!canRoll}
                className={isFresh ? "pulse" : ""}
              >
                Roll
              </button>
            </div>
            <div className="w-full flex gap-[12px] pb-[12px] px-[12px] box-border">
              <button onClick={handleIncrement} disabled={!canIncrement}>
                +
              </button>
              <button onClick={handleReset} disabled={!(roll > 0 || round > 1)}>
                Reset
              </button>
              <button onClick={handleDecrement} disabled={!canDecrement}>
                -
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
