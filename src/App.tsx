import { useState, useRef, type RefObject } from "react";
import { Aim, getAngle } from "./Aim";
import nextBounce from './nextBounce';

export default function App() {
  const [number, setNumber] = useState(1);
  const wallsRef = useRef<HTMLElement>();
  const [HPs, setHPs] = useState<any[]>([])

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

    const hits = [nextBounce(
      rect.left + rect.width / 2,
      rect.top + rect.height / 2,
      angle,
      walls
    )];

    while (true) {
      const lastHit = hits[hits.length - 1];
      console.log(lastHit)

      if (!lastHit || hits.length > 100) break;

      hits.push(nextBounce(
        lastHit[0],
        lastHit[1],
        lastHit[2] ?? 1,
        walls
      ));
    }

    console.log('Hits:', hits.length - 1, hits);

    setHPs(hits.map((hit, i) => hit && <div key={i} style={{
      position: 'fixed',
      width: '20px', height: '20px',
      background: 'red',
      left: hit[0], top: hit[1]
    }} />))
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
      {HPs}
    </div>
  </main>;
}