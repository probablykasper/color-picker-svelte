<script lang="ts">
  import { Color } from '$lib/color'
  import ColorArea from '$lib/ColorArea.svelte'
  import HueSlider from '$lib/HueSlider.svelte'

  let color = new Color('#00ff9d')
</script>

<h1 style:color={color.toHex()}>Color Picker Svelte</h1>

<div style="margin: 20px">
  <ColorArea bind:color />
  <HueSlider bind:color />
</div>

<style lang="sass">
  :global(body)
    margin: 100px 0px
    font-family: Arial, Helvetica, sans-serif
    font-size: 18px
    background-color: #111318
    color: #f2f2f2
    text-align: center
  h1
    color: #00ff9d
</style>
