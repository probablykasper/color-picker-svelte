<script lang="ts">
  import { Color } from '$lib/color'
  import ColorInput from '$lib/ColorInput.svelte'
  import { TinyColor } from '@ctrl/tinycolor'

  let color = new Color('#ff3d91')
  $: darkMode = !whiteForegroundWorks(color.toHex())

  export function whiteForegroundWorks(hex: string) {
    return new TinyColor(hex).getBrightness() < 127.5
  }
</script>

<div class="center" class:dark-mode={darkMode}>
  <h1 style:color={color.toHex()}>Color Picker Svelte</h1>

  <ColorInput bind:color title="Text color" --input-width="250px" />
</div>

<style lang="sass">
  :global(html, body)
    height: 100%
    margin: 0px
  .center
    display: flex
    flex-direction: column
    align-items: center
    color: #000000
    height: 100%
    padding: 100px 0px
    font-family: Arial, Helvetica, sans-serif
    font-size: 16px
    background-color: #ffffff
    transition: background-color, 200ms ease-out
  .dark-mode
    background-color: #111318
    --picker-background: #25272d
    color: #ffffff
</style>
