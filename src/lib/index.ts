export { default as ColorInput } from './ColorInput.svelte'
export { default as ColorPicker } from './ColorPicker.svelte'

export { default as HueSlider } from './HueSlider.svelte'
export { default as AlphaSlider } from './AlphaSlider.svelte'
export { default as ColorArea } from './ColorArea.svelte'
export { default as Slider } from './Slider.svelte'

export { Color } from './color'

export const enum Position {
  Auto,
  Above,
  Below,
}

/** Determines if `popupElement` should be shown above `positioningContextElement` */
export function shouldShowAbove(popupElement: HTMLElement, positioningContextElement: HTMLElement) {
  const inputBounds = positioningContextElement.getBoundingClientRect()
  const spaceAbove = inputBounds.top
  const spaceBelow = window.innerHeight - (inputBounds.top + inputBounds.height)
  const enoughSpaceAbove = spaceAbove > popupElement.clientHeight
  const enoughSpaceBelow = spaceBelow > popupElement.clientHeight
  return !enoughSpaceBelow && enoughSpaceAbove
}
