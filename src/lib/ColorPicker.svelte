<script lang="ts">
  import type { Color } from './color'
  import ColorArea from './ColorArea.svelte'
  import HueSlider from './HueSlider.svelte'
  import AlphaSlider from './AlphaSlider.svelte'
  import { shouldShowAbove } from '$lib'

  export let color: Color
  export let isOpen = false
  export let showAlphaSlider = false
  /** Element used to figure out position (probably an input element) */
  export let positioningContextElement: HTMLElement
  let pickerEl: HTMLDivElement | undefined

  export let onInput = () => {
    /* noop */
  }
  $: color, onInput()

  let showAbove = false
  $: if (pickerEl && positioningContextElement) {
    showAbove = shouldShowAbove(pickerEl, positioningContextElement)
  }
</script>

{#if isOpen}
  <div
    bind:this={pickerEl}
    class="color-picker"
    class:above={showAbove}
    class:hidden={!isOpen}
    on:touchstart|preventDefault
  >
    <ColorArea bind:color {onInput} />
    <HueSlider bind:color {onInput} />
    {#if showAlphaSlider}
      <AlphaSlider bind:color {onInput} />
    {/if}
  </div>
{/if}

<style lang="sass">
  .color-picker
    position: absolute
    top: 100%
    left: 0px
    display: flex
    border: 1px solid hsla(222, 14%, 47%, 0.3)
    background-color: inherit
    border-radius: 5px
    box-sizing: border-box
    padding: 12px
    width: 100%
    height: 210px
    // :global(.color-area)
    //   width: 170px
    //   height: 170px
    z-index: 50
    &.above
      top: auto
      bottom: 100%
    &.hidden
      display: none
    :global(.slider)
      margin-left: 12px
</style>
