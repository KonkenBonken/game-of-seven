import useMouse from '@react-hook/mouse-position';

export default function Aim() {
  const mouse = useMouse(document.body),
    angle = Math.atan2((mouse.y ?? 0) - window.innerHeight / 2, (mouse.x ?? 0) - window.innerWidth / 2)

  return <div id='aim'
    style={{
      transform: `rotate(${angle}rad)`
    }}
  />
}