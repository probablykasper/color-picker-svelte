<script lang="ts">
  import { TinyColor } from '@ctrl/tinycolor'
  import { Color } from './color'
  import ColorPicker from './ColorPicker.svelte'

  export let color: Color
  export let title = 'Color'
  export let isOpen = false

  let classes = ''
  export { classes as class }

  $: update(color)
  function update(color: Color) {
    if (color.h !== lastColor.h || color.s !== lastColor.s || color.v !== lastColor.v) {
      text = color.toHex()
      lastColor = new Color(color)
    }
  }

  let text = color.toHex()
  let lastColor = new Color(color)

  function onInput() {
    const tinyColor = new TinyColor(text)
    if (tinyColor.isValid) {
      color = new Color(tinyColor.toHsv())
      lastColor = color
    }
  }

  let parent: HTMLElement
  function focusout(e: FocusEvent) {
    if (e.relatedTarget === null) {
      isOpen = false
    } else if (e.relatedTarget instanceof HTMLElement) {
      const stayingInParent = parent.contains(e.relatedTarget)
      if (!stayingInParent) {
        isOpen = false
      }
    }
  }

  let inputElement: HTMLInputElement
  async function open(e: Event) {
    if (!isOpen) {
      isOpen = true
      inputElement.focus()
      inputElement.select()
      e.preventDefault()
    }
  }
</script>

<div bind:this={parent} class="input" on:mousedown={open} on:focusout={focusout} tabindex="-1">
  <div class="color-frame" style:background-color={color.toHex()} />
  <span>
    <input
      class:hidden={!isOpen}
      bind:this={inputElement}
      type="text"
      bind:value={text}
      on:input={onInput}
      on:focus={open}
    />
    <span class:hidden={isOpen} class="title">{title}</span>
  </span>
  <slot {isOpen}>
    <ColorPicker bind:color {isOpen} />
  </slot>
</div>

<style lang="sass">
  .input
    width: var(--input-width, 100%)
    display: flex
    justify-items: center
    align-items: center
    box-sizing: border-box
    border-radius: 4px
    padding: 6px 10px
    background: var(--picker-background, #ffffff)
    border: 1px solid hsla(222, 14%, 47%, 0.3)
    box-shadow: 0px 1px 2px 0px rgb(0, 0, 0, 0.05)
    position: relative
    user-select: none
    outline: none
    cursor: default
    &:focus-within
      border-color: #0269f7
      box-shadow: 0px 0px 0px 3px rgba(2, 105, 247, 0.4)
  span
    position: relative
  .title
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    pointer-events: none
    &.hidden
      display: none
  .color-frame
    pointer-events: none
    margin-right: 12px
    height: 20px
    width: 38px
    flex-shrink: 0
    border-radius: 4px
    border: 1px solid hsla(0, 0%, 100%, 0.3)
    box-sizing: border-box
    box-shadow: 0px 1px 2px 0px rgb(0, 0, 0, 0.05)
  input
    color: inherit
    font-family: inherit
    font-size: inherit
    background-color: transparent
    width: 100%
    outline: none
    border: none
    padding: 0px
    opacity: 1
    cursor: text
    &.hidden
      opacity: 0
      cursor: inherit
</style>
