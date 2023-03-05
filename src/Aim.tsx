import useMouse from '@react-hook/mouse-position';

let lastAngle = 0;

export function Aim() {
  const mouse = useMouse(document.body),
    angle = Math.atan2((mouse.y ?? 0) - window.innerHeight / 2, (mouse.x ?? 0) - window.innerWidth / 2);

  lastAngle = angle;

  return <div id='aim'
    style={{
      transform: `rotate(${angle}rad)`
    }}
  />
}

export function getAngle() {
  return lastAngle;
}