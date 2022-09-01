<script lang="ts">
  import { Color } from '$lib/color'

  export let color: Color
  export let clientHeight = 0
  export let onInput: (value: Color) => void = () => {
    /* noop */
  }

  let hue = color.h
  $: hue = color.h

  let parent: HTMLElement

  function pickPos(clientX: number, clientY: number) {
    const rect = parent.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    color = new Color({
      h: hue,
      s: x / rect.width,
      v: 1 - y / rect.height,
      a: color.a,
    })
    onInput(color)
  }

  function onMouse(e: MouseEvent) {
    if (mouseHold && e.target instanceof HTMLElement) {
      pickPos(e.clientX, e.clientY)
    }
  }
  let mouseHold = false
  function mouseDown(e: MouseEvent) {
    if (e.buttons === 1) {
      mouseHold = true
      pickPos(e.clientX, e.clientY)
    }
  }
  function mouseUp() {
    mouseHold = false
  }

  let touching = false
  function onTouch(e: TouchEvent) {
    if (touching) {
      pickPos(e.touches[0].clientX, e.touches[0].clientY)
    }
  }
  function touchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      touching = true
      pickPos(e.touches[0].clientX, e.touches[0].clientY)
    }
  }
  function touchEnd() {
    touching = false
  }
</script>

<svelte:window
  on:mousemove={onMouse}
  on:mouseup={mouseUp}
  on:touchmove={onTouch}
  on:touchend={touchEnd}
/>

<div
  bind:this={parent}
  bind:clientHeight
  class="color-area"
  on:mousedown={mouseDown}
  on:touchstart|preventDefault={touchStart}
  style:--hue-color={`hsl(${Math.round(hue)},100%,50%)`}
>
  <div
    class="handle"
    style:top={(1 - color.v) * 100 + '%'}
    style:left={color.s * 100 + '%'}
    style:background-color={color.toHexString()}
  />
</div>

<style lang="sass">
  .color-area
    width: 100%
    user-select: none
    height: 100%
    position: relative
    border-radius: 4px
    background: linear-gradient(transparent, #000000), linear-gradient(0.25turn, #ffffff, transparent), var(--hue-color)
  .handle
    width: 14px
    height: 14px
    position: absolute
    transform: translate(-50%, -50%)
    border-radius: 50%
    border: 2px solid #ffffff
    box-shadow: 0px 0px 3px 0px hsla(0, 0%, 0%, 0.5)
</style>
