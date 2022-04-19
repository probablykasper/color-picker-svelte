<script lang="ts">
  import { Color } from '$lib/color'
  import ColorArea from '$lib/ColorArea.svelte'
  import HueSlider from '$lib/HueSlider.svelte'

  let color = new Color('#00ff9d')
  $: console.log(color)
</script>

{color.toHex()}

<h1 style:color={color.toHex()}>Color Picker Svelte</h1>

<div class="center">
  <div class="color-picker">
    <ColorArea bind:color />
    <HueSlider bind:color />
  </div>
</div>

<style lang="sass">
  .center
    display: flex
    justify-content: center
  .color-picker
    display: flex
    border: 1px solid white
    border-radius: 5px
    padding: 12px
    // background-color: #ffffff
    :global(.color-area)
      width: 170px
      height: 170px
    :global(.slider)
      margin-left: 12px
</style>
