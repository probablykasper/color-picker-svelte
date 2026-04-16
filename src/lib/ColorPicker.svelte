<script lang="ts">
  import type { Color } from './color.svelte.js'
  import ColorArea from './ColorArea.svelte'
  import HueSlider from './HueSlider.svelte'
  import AlphaSlider from './AlphaSlider.svelte'
  import { Position, shouldShowAbove } from './utils.js'

  let pickerEl: HTMLDivElement | undefined = $state()

  interface Props {
    color: Color
    isOpen?: boolean
    showAlphaSlider?: boolean
    position?: Position
    /** Element used to figure out position (probably an input element) */
    positioningContextElement: HTMLElement
    onInput?: () => void
  }

  let {
    color = $bindable(),
    isOpen = false,
    showAlphaSlider = false,
    position = Position.Auto,
    positioningContextElement,
    onInput = () => {
      /* noop */
    },
  }: Props = $props()
  $effect(() => {
    if (color) onInput()
  })

  let showAbove = $derived.by(() => {
    if (!pickerEl) {
      return false
    }
    shouldShowAbove(pickerEl, positioningContextElement)
  })
</script>

{#if isOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    bind:this={pickerEl}
    class="color-picker"
    class:above={position === Position.Auto ? showAbove : position === Position.Above}
    class:hidden={!isOpen}
    ontouchstart={(e) => {
      e.preventDefault()
    }}
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
