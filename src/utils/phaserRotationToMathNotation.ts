export function phaserRotationToMathNotation(rotation: number) {
  return -rotation + (rotation < 0 ? 2 * Math.PI : 0);
}
