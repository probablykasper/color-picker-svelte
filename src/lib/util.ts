export function clamp(min: number, max: number, x: number): number {
  if (x < min) {
    return min
  } else if (x > max) {
    return max
  } else {
    return x
  }
}
