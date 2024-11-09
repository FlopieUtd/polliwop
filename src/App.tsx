import { useCallback, useEffect, useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import "./App.css";
import { Die } from "./components/Die/Die";

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

  console.log(theta);

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

  const handleRoll = useCallback(() => {
    if (round === 1 && roll === 0) {
      setStartTime(new Date().toLocaleTimeString());
    }

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

  return (
    <HelmetProvider>
      <Helmet>
        <title>Play Perudo</title>
        <meta name="description" content="Play Perudo on your mobile phone!" />
        <meta
          name="keywords"
          content="play perudo mobile phone online browser perudo dice game"
        />
        <meta name="author" content="Floris de Haan" />
        <meta property="og:image" content="./perudo.webp" />
        <meta property="og:image:alt" content="Perudo" />
        <link rel="canonical" href="https://solidesoftware.nl/perudo/" />
        <link rel="icon" href="./perudo.ico" />
      </Helmet>
      <div className="App">
        <h1 className="title">Let's play Perudo!</h1>
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
              <button onClick={handleRoll} disabled={!canRoll}>
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
    </HelmetProvider>
  );
};

export default App;
