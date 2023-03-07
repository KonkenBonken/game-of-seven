export default function nextBounce(
  ballX: number, ballY: number, θ: number,
  walls: { top: number, right: number, bottom: number, left: number }
): [x: number, y: number, θ: number | false] {

  const
    k = Math.tan(θ),
    m = ballY,
    goingLeft = θ < Math.PI * -.5 || θ > Math.PI * .5,
    relX = goingLeft ? walls.left : walls.right,
    y = k * (relX - ballX) + m;

  const hitsRoof = y < walls.top;
  if (hitsRoof) {
    const x = (walls.top - m) / k + ballX;
    return [x, walls.top, -θ];
  }

  const goesOut = y > walls.bottom;
  if (goesOut) {
    const y = window.innerWidth,
      x = y / k + ballX;
    return [x, y, false];
  }

  return [relX, y, Math.PI - θ];
}