import { TinyColor } from '@ctrl/tinycolor'

type Hsv = {
  h: number
  s: number
  v: number
}

function clamp(min: number, max: number, x: number): number {
  if (x < min) {
    return min
  } else if (x > max) {
    return max
  } else {
    return x
  }
}

export class Color {
  h: number
  s: number
  v: number
  constructor(value: string | Hsv) {
    if (typeof value === 'string') {
      const hsv = new TinyColor(value).toHsv()
      this.h = hsv.h
      this.s = hsv.s
      this.v = hsv.v
    } else {
      this.h = clamp(0, 360, value.h)
      this.s = clamp(0, 1, value.s)
      this.v = clamp(0, 1, value.v)
    }
  }
  toHex() {
    return new TinyColor({ h: this.h, s: this.s, v: this.v }).toHex()
  }
}
