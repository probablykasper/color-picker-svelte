<script lang="ts">
  import { Color } from '$lib/color'

  export let color: Color

  let hue = color.h
  $: if (color.s > 0 || color.v > 0) {
    hue = color.h
  }

  let parent: HTMLElement

  function onMouse(e: MouseEvent) {
    if (mouseHold && e.target instanceof HTMLElement) {
      const rect = parent.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      color = new Color({
        h: hue,
        s: x / rect.width,
        v: 1 - y / rect.height,
      })
    }
  }
  let mouseHold = false
  function mouseDown(e: MouseEvent) {
    if (e.buttons === 1) {
      mouseHold = true
      onMouse(e)
    }
  }
  function mouseUp() {
    mouseHold = false
  }
</script>

<svelte:window on:mousemove={onMouse} on:mouseup={mouseUp} />

<div
  bind:this={parent}
  class="color-area"
  on:mousedown={mouseDown}
  style:--hue-color={`hsl(${Math.round(hue)},100%,50%)`}
>
  <div
    class="handle"
    style:top={(1 - color.v) * 100 + '%'}
    style:left={color.s * 100 + '%'}
    style:background-color={color.toHex()}
  />
</div>

<style lang="sass">
  .color-area
    width: 100%
    user-select: none
    height: 100%
    position: relative
    background: linear-gradient(transparent, #000000), linear-gradient(0.25turn, #ffffff, transparent), var(--hue-color)
  .handle
    width: 14px
    height: 14px
    position: absolute
    transform: translate(-50%, -50%)
    border: 2px solid #ffffff
    border-radius: 50%
</style>
