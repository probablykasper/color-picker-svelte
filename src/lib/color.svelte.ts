import { TinyColor } from '@ctrl/tinycolor'
import { clamp } from './utils.js'

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
    let hsv
    if (typeof value === 'string') {
      hsv = new TinyColor(value).toHsv()
    } else {
      hsv = value
    }
    this.h = $state(clamp(0, 360, hsv.h))
    this.s = $state(clamp(0, 1, hsv.s))
    this.v = $state(clamp(0, 1, hsv.v))
    this.a = $state(clamp(0, 1, hsv.a))
  }
  toHexString() {
    return new TinyColor({ h: this.h, s: this.s, v: this.v }).toHexString()
  }
  toHex8String() {
    return new TinyColor({ h: this.h, s: this.s, v: this.v, a: this.a }).toHex8String()
  }
}
