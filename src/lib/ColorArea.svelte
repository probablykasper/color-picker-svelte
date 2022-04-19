<script lang="ts">
  import { Color } from '$lib/color'

  export let color: Color

  let hue = color.h
  $: if (color.s > 0 && color.v > 0) {
    hue = color.h
  }

  let areaElement: HTMLElement

  function onMouse(e: MouseEvent) {
    if (mouseHold && e.target instanceof HTMLElement) {
      const rect = areaElement.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      console.log(hue)

      console.log(hue, x / rect.width, 1 - y / rect.height)
      color = new Color({
        h: hue,
        s: x / rect.width,
        v: 1 - y / rect.height,
      })
      console.log(color)
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
  bind:this={areaElement}
  class="color-area"
  on:mousedown={mouseDown}
  style:--hue-color={`hsl(${Math.round(hue)},100%,50%)`}
>
  <div class="point" style:top={(1 - color.v) * 100 + '%'} style:left={color.s * 100 + '%'} />
</div>

<style lang="sass">
  .color-area
    width: 200px
    user-select: none
    height: 170px
    border: 2px solid white
    position: relative
    background: linear-gradient(transparent, #000000), linear-gradient(0.25turn, #ffffff, transparent), var(--hue-color)
  .point
    width: 12px
    height: 12px
    position: absolute
    transform: translate(-50%, -50%)
    border: 2px solid #ffffff
    box-shadow: 0px 0px 3px 0px rgba(0,0,0,1)
    border-radius: 50%
</style>
