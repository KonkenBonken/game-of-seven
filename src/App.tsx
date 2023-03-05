import { useState } from "react";

export default function App() {
  const [number, setNumber] = useState(1);

  return <>
    <h1>Game Of Seven</h1>
    <div id='walls' >
      <div id='ball'
        style={{
          top: '50%',
          left: '50%'
        }}
      />
      <div id='number' >
        {number}
      </div>
    </div>
  </>;
}