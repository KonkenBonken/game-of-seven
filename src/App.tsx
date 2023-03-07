import { useState, useRef, type RefObject } from "react";
import { Aim, getAngle } from "./Aim";
import nextBounce from './nextBounce';

export default function App() {
  const [number, setNumber] = useState(1);
  const wallsRef = useRef<HTMLElement>();

  function onClick() {
    const angle = getAngle(),
      rect = wallsRef.current?.getBoundingClientRect();

    if (!rect) return;

    const walls = {
      top: rect.top,
      right: rect.left + rect.width,
      bottom: rect.top + rect.height,
      left: rect.left
    };

    const bounces: [number, number, number][] = [],
      firstBounce = nextBounce(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2,
        angle, walls
      );

    if (firstBounce) {
      bounces.push(firstBounce);

      while (true) {
        const lastBounce = bounces[bounces.length - 1];

        const bounce = nextBounce(...lastBounce, walls);
        if (bounce)
          bounces.push(bounce);
        else break;

        if (bounces.length >= 1000) break;
      }
    }

      bounces.push(nextBounce(
        ...lastBounce,
        walls
      ));
    }
  }

  return <main onClick={onClick}>
    <h1>Game Of Seven</h1>
    <div id='walls' ref={wallsRef as RefObject<HTMLDivElement>}>
      <div id='ball'
        style={{
          top: '50%',
          left: '50%'
        }}
      >
        <Aim />
      </div>
      <div id='number' >
        {number}
      </div>
    </div>
  </main>;
}