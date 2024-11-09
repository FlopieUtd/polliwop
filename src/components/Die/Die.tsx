import { useCallback, useEffect, useRef } from "react";
import "./Die.css";

export const Die = ({
  roll,
  coordinate,
  animationLength,
  showFaces,
}: {
  roll: number;
  coordinate: [number, number];
  animationLength: number;
  showFaces: boolean;
}) => {
  const dieRef = useRef<HTMLDivElement>(null);

  const x = useRef(0);
  const z = useRef(0);

  const handleRoll = useCallback(() => {
    if (dieRef.current) {
      const newX = Math.floor(Math.random() * 4) * 90;
      const newZ = Math.floor(Math.random() * 4) * 90;

      const finalX = newX === x.current ? newX - 360 : newX;
      const finalZ = newZ === z.current ? newZ - 360 : newZ;

      x.current = finalX;
      z.current = finalZ;

      dieRef.current.style.transform = `rotateX(${finalX + 0.1}deg) rotateZ(${
        finalZ + 0.1
      }deg)`;
    }
  }, []);

  useEffect(() => {
    handleRoll();
  }, [handleRoll, roll]);

  return (
    <div
      ref={dieRef}
      className="die"
      style={{
        left: coordinate[0] - 40,
        top: coordinate[1] - 40,
        transition: `transform ${animationLength}ms`,
      }}
    >
      <div id="die-side" className="side one">
        {showFaces && (
          <img
            src="./perudo.webp"
            alt="perudo"
            style={{ width: 70, height: 70 }}
          />
        )}
      </div>
      <div id="die-side-two" className="side two">
        {showFaces && (
          <>
            <div className="dot two-1"></div>
            <div className="dot two-2"></div>
          </>
        )}
      </div>
      <div id="die-side-three" className="side three">
        {showFaces && (
          <>
            <div className="dot three-1"></div>
            <div className="dot three-2"></div>
            <div className="dot three-3"></div>
          </>
        )}
      </div>
      <div id="die-side-four" className="side four">
        {showFaces && (
          <>
            <div className="dot four-1"></div>
            <div className="dot four-2"></div>
            <div className="dot four-3"></div>
            <div className="dot four-4"></div>
          </>
        )}
      </div>
      <div id="die-side-five" className="side five">
        {showFaces && (
          <>
            <div className="dot five-1"></div>
            <div className="dot five-2"></div>
            <div className="dot five-3"></div>
            <div className="dot five-4"></div>
            <div className="dot five-5"></div>
          </>
        )}
      </div>
      <div id="die-side-six" className="side six">
        {showFaces && (
          <>
            <div className="dot six-1"></div>
            <div className="dot six-2"></div>
            <div className="dot six-3"></div>
            <div className="dot six-4"></div>
            <div className="dot six-5"></div>
            <div className="dot six-6"></div>
          </>
        )}
      </div>
    </div>
  );
};
