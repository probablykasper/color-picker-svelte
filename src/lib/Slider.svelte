<script lang="ts">
  import type { Color } from './color'
  import { clamp } from './util'

  export let value: number
  export let max: number
  export let color: Color
  export let handleColor: string | undefined = undefined
  export let style: 'hue' | 'alpha'
  export let onInput: (color: number) => void = () => {
    /* noop */
  }

  let parent: HTMLElement

  function pickPos(clientY: number) {
    const rect = parent.getBoundingClientRect()
    const y = clientY - rect.top
    const percentage = y / rect.height
    value = clamp(0, max, percentage * max)
    onInput(value)
  }

  function onMouse(e: MouseEvent) {
    if (mouseHold && e.target instanceof HTMLElement) {
      pickPos(e.clientY)
    }
  }
  let mouseHold = false
  function mouseDown(e: MouseEvent) {
    if (e.buttons === 1) {
      mouseHold = true
      pickPos(e.clientY)
    }
  }
  function mouseUp() {
    mouseHold = false
  }

  let touching = false
  function onTouch(e: TouchEvent) {
    if (touching) {
      pickPos(e.touches[0].clientY)
    }
  }
  function touchStart(e: TouchEvent) {
    if (e.touches.length === 1) {
      touching = true
      pickPos(e.touches[0].clientY)
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
  role="slider"
  aria-valuenow={value}
  aria-valuemax={max}
  tabindex="-1"
  class="slider"
  on:mousedown={mouseDown}
  on:touchstart|preventDefault={touchStart}
  class:hue={style === 'hue'}
  class:alpha={style === 'alpha'}
  style="--color:{color.toHexString()};"
>
  <div class="slider-track">
    <div class="slider-track-overlay"></div>
  </div>
  <div
    class="slider-handle"
    style:top={(value / max) * 100 + '%'}
    style:background-color={handleColor}
  ></div>
</div>

<style lang="sass">
  .slider
    padding: 0rem 0.300rem
    flex-shrink: 0
    user-select: none
    box-sizing: border-box
    position: relative
  .slider-track
    height: 100%
    width: 0.5rem
    border-radius: 4px
  .hue .slider-track
    background: linear-gradient(hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))
  .alpha .slider-track
    background-image: repeating-conic-gradient(#bfbfbf 0 25%, #ffffff 0 50%)
    background-size: 0.5rem 0.5rem
    background-position: 0 0, 0.25rem 0.25rem
  .alpha .slider-track-overlay
    width: 100%
    height: 100%
    background-image: linear-gradient(to bottom, transparent 0%, var(--color) 100%)
    border-radius: inherit
  .slider-handle
    width: 1rem
    height: 1rem
    box-sizing: border-box
    border-radius: 100px
    left: 50%
    transform: translate(-50%, -50%)
    position: absolute
    border: 2px solid #ffffff
    box-shadow: 0px 0px 3px 0px hsla(0, 0%, 0%, 0.5)
</style>
