<script lang="ts">
  import { clamp } from './util'

  export let value: number
  export let max: number
  export let backgroundColor: string | undefined = undefined

  let parent: HTMLElement

  function pickPos(clientY: number) {
    const rect = parent.getBoundingClientRect()
    const y = clientY - rect.top
    const percentage = (value = y / rect.height)
    value = clamp(0, max, percentage * max)
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
  class="slider"
  on:mousedown={mouseDown}
  on:touchstart|preventDefault={touchStart}
>
  <div class="slider-track">
    <div
      class="slider-handle"
      style:top={(value / max) * 100 + '%'}
      style:background-color={backgroundColor}
    />
  </div>
</div>

<style lang="sass">
  .slider
    width: 1.125rem
    padding: 0rem 0.300rem
    flex-shrink: 0
    user-select: none
    box-sizing: border-box
    position: relative
  .slider-track
    height: 100%
    border-radius: 4px
    background: linear-gradient(hsl(0,100%,50%),hsl(60,100%,50%),hsl(120,100%,50%),hsl(180,100%,50%),hsl(240,100%,50%),hsl(300,100%,50%),hsl(360,100%,50%))
  .slider-handle
    width: 100%
    height: 4px
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
