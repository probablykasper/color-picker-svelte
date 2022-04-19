<script lang="ts">
  import type { Color } from './color'
  import ColorArea from './ColorArea.svelte'
  import HueSlider from './HueSlider.svelte'

  export let color: Color
  export let isOpen = false
</script>

<div class="color-picker" class:hidden={!isOpen} on:touchstart|preventDefault>
  <ColorArea bind:color />
  <HueSlider bind:color />
</div>

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
    &.hidden
      display: none
    :global(.slider)
      margin-left: 12px
</style>
