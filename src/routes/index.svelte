<script lang="ts">
  import { Color } from '$lib/color'
  import ColorInput from '$lib/ColorInput.svelte'
  import { TinyColor } from '@ctrl/tinycolor'

  let color = new Color('#ff3d91')
  let showAlphaSlider = true
  $: darkMode = !whiteForegroundWorks(color.toHex8String())

  export function whiteForegroundWorks(hex: string) {
    return new TinyColor(hex).getBrightness() < 127.5
  }
</script>

<div class="center" class:dark-mode={darkMode}>
  <h1 style:color={color.toHex8String()}>Color Picker Svelte</h1>

  <ColorInput bind:color {showAlphaSlider} title="Text color" --input-width="250px" />

  <div class="row" style:margin-top="230px">
    Alpha <input type="checkbox" bind:checked={showAlphaSlider} />
  </div>
</div>

<style lang="sass">
  :global(html, body)
    height: 100%
    margin: 0px
  .center
    display: flex
    flex-direction: column
    align-items: center
    height: 100%
    padding: 20px 0px
    box-sizing: border-box
    font-family: Arial, Helvetica, sans-serif
    font-size: 16px
    transition: background-color, 200ms ease-out
    background-color: #ffffff
    color: #000000
  .center.dark-mode
    background-color: #111318
    --picker-background: #25272d
    color: #ffffff
  .row
    margin-top: 8px
</style>
