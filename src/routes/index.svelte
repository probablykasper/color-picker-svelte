<script lang="ts">
  import { Color } from '$lib/color'
  import ColorInput from '$lib/ColorInput.svelte'
  import { TinyColor } from '@ctrl/tinycolor'

  let color = new Color('#ff3d91')
  let showAlphaSlider = true
  let isOpen = false
  let title = 'Text color'

  export function whiteForegroundWorks(hex: string) {
    return new TinyColor(hex).getBrightness() < 127.5
  }

  $: darkMode = !whiteForegroundWorks(color.toHex8String())
  $: setDarkMode(darkMode)
  function setDarkMode(darkMode: boolean) {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark-mode', darkMode)
    }
  }
</script>

<div class="center" class:dark-mode={darkMode}>
  <h1 style:color={color.toHex8String()}>Color Picker Svelte</h1>

  <ColorInput
    bind:color
    bind:isOpen
    {showAlphaSlider}
    {title}
    --input-width="250px"
    onInput={() => {
      console.log(color)
    }}
  />

  <div>
    <div class="row" style:margin-top="230px">
      <span>showAlphaSlider</span>
      <input type="checkbox" bind:checked={showAlphaSlider} />
    </div>
    <div class="row">
      <span>isOpen</span>
      <input type="checkbox" bind:checked={isOpen} />
    </div>
    <div class="row">
      <span>title</span>
      <input type="text" bind:value={title} />
    </div>
  </div>
</div>

<style lang="sass">
  :global(html, body)
    margin: 0px
  :global(html.dark-mode), .center.dark-mode
    background-color: #111318
    --picker-background: #25272d
    color: #ffffff
  .center
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    padding: 20px 0px
    box-sizing: border-box
    font-family: Arial, Helvetica, sans-serif
    font-size: 16px
    transition: background-color, 200ms ease-out
    background-color: #ffffff
    color: #000000
  .row
    margin-top: 8px
    display: flex
  span
    margin-right: 12px
  input
    margin-left: auto
</style>
