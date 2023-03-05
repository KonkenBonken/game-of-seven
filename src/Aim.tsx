import useMouse from '@react-hook/mouse-position';

let lastAngle = Math.PI * 1.5;

export function Aim() {
  const mouse = useMouse(document.body),
    angle = (!mouse.y || !mouse.x) ? lastAngle :
      Math.atan2(mouse.y - window.innerHeight / 2, mouse.x - window.innerWidth / 2) + Math.PI * 2;

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