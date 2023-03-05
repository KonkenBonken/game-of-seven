import { useState } from "react";
import { Aim, getAngle } from "./Aim";

export default function App() {
  const [number, setNumber] = useState(1);

  return <main onClick={onCLick}>
    <h1>Game Of Seven</h1>
    <div id='walls' >
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

function onCLick() {
  const angle = getAngle();
  console.log(angle);
}