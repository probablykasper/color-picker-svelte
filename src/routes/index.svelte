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
  $: hex = color.toHex8String()
  $: darkMode = !whiteForegroundWorks(hex)
  $: setDarkMode(darkMode)
  function setDarkMode(darkMode: boolean) {
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark-mode', darkMode)
    }
  }
</script>

<div class="center">
  <h1 style:color={hex} class:light-mode={!darkMode} style:--color={hex}>Color Picker Svelte</h1>

  <div class="picker" class:dark-mode={darkMode}>
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
  </div>

  <div>
    <div class="row" style:margin-top="220px">
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
  .picker
    --picker-background: #ffffff
    color: #000000
    &.dark-mode
      --picker-background: #25272d
      color: #ffffff
  .center
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    padding: 5px 0px
    box-sizing: border-box
    font-family: Arial, Helvetica, sans-serif
    font-size: 16px
    background-color: #111318
    color: #ffffff
  h1
    padding: 0px 7px
    position: relative
    margin: 30px 0px
    z-index: 1
    &::before
      z-index: -1
      content: ''
      position: absolute
      top: 0px
      left: 0px
      width: 100%
      height: 100%
      transition: all 200ms ease-out
      border-radius: 5px
      opacity: 0
      background-color: #ffffff
      box-shadow: 0px 0px 0px 0px #ffffff, 0px 0px 0px 0px #ffffff
    &.light-mode::before
        opacity: 1
        box-shadow: 0px 0px 0px 5px #ffffff, 0px 0px 10px 5px #ffffff
    // &.dark-mode
    //   padding: 0px 0px
    //   background-color: transparent
  .row
    margin-top: 8px
    display: flex
  span
    margin-right: 12px
  input
    margin-left: auto
</style>
