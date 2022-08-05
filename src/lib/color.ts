import { TinyColor } from '@ctrl/tinycolor'
import { clamp } from './util'

type Hsv = {
  h: number
  s: number
  v: number
  a: number
}

export class Color {
  h: number
  s: number
  v: number
  a: number
  constructor(value: string | Hsv) {
    if (typeof value === 'string') {
      const hsv = new TinyColor(value).toHsv()
      this.h = hsv.h
      this.s = hsv.s
      this.v = hsv.v
      this.a = hsv.a
    } else {
      this.h = clamp(0, 360, value.h)
      this.s = clamp(0, 1, value.s)
      this.v = clamp(0, 1, value.v)
      this.a = clamp(0, 1, value.a)
    }
  }
  toHexString() {
    return new TinyColor({ h: this.h, s: this.s, v: this.v }).toHexString()
  }
  toHex8String() {
    return new TinyColor({ h: this.h, s: this.s, v: this.v, a: this.a }).toHex8String()
  }
}
