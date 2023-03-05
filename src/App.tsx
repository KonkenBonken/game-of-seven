import { useState, useRef, type RefObject } from "react";
import { Aim, getAngle } from "./Aim";

export default function App() {
  const [number, setNumber] = useState(1);
  const wallsRef = useRef<HTMLElement>();

  return <main onClick={() => onClick(wallsRef.current)}>
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

function onClick(ref?: HTMLElement) {
  const angle = getAngle(),
    rect = ref?.getBoundingClientRect();

  if (!rect) return;

  const walls = {
    top: rect.top,
    right: rect.left + rect.width,
    bottom: rect.top + rect.height,
    left: rect.left
  };
}