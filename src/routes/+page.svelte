<script lang="ts">
  import { Position } from '$lib'
  import { Color } from '$lib/color'
  import ColorInput from '$lib/ColorInput.svelte'
  import { TinyColor } from '@ctrl/tinycolor'

  let color = new Color('#ff3d91')
  let showAlphaSlider = true
  let isOpen = false
  let title = 'Text color'
  let disabled = false
  let position = Position.Auto

  function whiteForegroundWorks(hex: string) {
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
  <nav>
    <a href="https://github.com/probablykasper/color-picker-svelte">GitHub</a>
    <a href="https://npmjs.com/package/color-picker-svelte">npm</a>
    <a href="https://svelte.dev/repl/8b00804d417b4fe89f42f90d6ed485e7?version=3.49.0">REPL</a>
  </nav>

  <h1 style:color={hex} class:light-mode={!darkMode} style:--color={hex}>Color Picker Svelte</h1>

  <div class="picker" class:dark-mode={darkMode}>
    <ColorInput
      bind:color
      bind:isOpen
      bind:position
      {showAlphaSlider}
      {title}
      {disabled}
      --input-width="260px"
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
      <span>title</span>
      <input type="text" bind:value={title} />
    </div>
    <div class="row">
      <span>isOpen</span>
      <input type="checkbox" bind:checked={isOpen} />
    </div>
    <div class="row">
      <span>disabled</span>
      <input type="checkbox" bind:checked={disabled} />
    </div>
    <div class="row">
      <span>position</span>
      <select bind:value={position}>
        <option value={Position.Auto}>Auto</option>
        <option value={Position.Above}>Above</option>
        <option value={Position.Below}>Below</option>
      </select>
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
    padding: 20px 0px
    box-sizing: border-box
    font-family: Arial, Helvetica, sans-serif
    font-size: 16px
    background-color: #111318
    color: #ffffff
  nav
    cursor: default
    a
      padding: 4px 2px
      margin: 0px 2px
      font-size: 16px
      text-decoration: none
      color: hsla(0, 100%, 100%, 0.75)
      &:hover
        color: #ffffff
  h1
    padding: 0px 7px
    position: relative
    margin-top: 10px
    margin-bottom: 30px
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
  .row
    margin-top: 8px
    display: flex
    align-items: center
    height: 26px
  span
    margin-right: 12px
  input, select
    margin-left: auto
  input[type='text']
    color: #ffffff
    background-color: #25272d
    border: 1px solid hsla(222deg, 14%, 47%, 0.3)
    padding: 0px 8px
    height: 26px
    box-sizing: border-box
    border-radius: 4px
    &:focus
      outline: none
      border: 1px solid #0269f7
      box-shadow: 0px 0px 0px 3px rgb(2 105 247 / 40%)
  select
    color: #ffffff
    background-color: #25272d
    border: 1px solid hsla(222deg, 14%, 47%, 0.3)
    padding: 0px 4px
    height: 26px
    box-sizing: border-box
    border-radius: 4px
    &:focus
      outline: none
      border: 1px solid #0269f7
      box-shadow: 0px 0px 0px 3px rgb(2 105 247 / 40%)
</style>
