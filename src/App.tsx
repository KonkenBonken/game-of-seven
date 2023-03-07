import { useState, useRef, type RefObject, type CSSProperties } from "react";
import { Aim, getAngle } from "./Aim";
import nextBounce from './nextBounce';

type nTuple = [number, number, number]

export default function App() {
  const [number, setNumber] = useState(1);
  const wallsRef = useRef<HTMLElement>();
  const [ballStyle, setBallStyle] = useState<CSSProperties>({ left: '50%', top: '50%' });

  async function onClick() {
    const angle = getAngle(),
      rect = wallsRef.current?.getBoundingClientRect();

    if (!rect) return;

    const walls = {
      top: rect.top,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      left: rect.left
    };

    const bounces: nTuple[] = [],
      firstBounce = nextBounce(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        angle, walls
      );

    if (firstBounce[2]) {
      bounces.push(firstBounce as nTuple);

      while (true) {
        const lastBounce = bounces[bounces.length - 1];

        const bounce = nextBounce(...lastBounce, walls);
        bounces.push(bounce as nTuple);
        if (!bounce[2]) break;

        if (bounces.length >= 1000) break;
      }
    }

    for (let i = 0; i < bounces.length; i++) {
      const [x, y] = bounces[i];
      setBallStyle({
        left: x - walls.left,
        top: y - walls.top
      });
      await new Promise(r => setTimeout(r, 500));
    }

    setBallStyle({
      left: '50%',
      top: '50%'
    });
  }

  return <main onClick={onClick}>
    <h1>Game Of Seven</h1>
    <div id='walls' ref={wallsRef as RefObject<HTMLDivElement>}>
      <div id='ball' style={ballStyle}>
        <Aim />
      </div>
      <div id='number' >
        {number}
      </div>
    </div>
  </main>;
}