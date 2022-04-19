<script lang="ts">
  import { TinyColor } from '@ctrl/tinycolor'
  import { Color } from './color'
  import ColorPicker from './ColorPicker.svelte'

  export let color: Color
  export let title = 'Color'
  export let isOpen = false

  let text = color.toHex()
  function onInput() {
    console.log(text)
    const tinyColor = new TinyColor(text)
    color = new Color(tinyColor.toHsv())
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
    background-color: #ffffff
    border: 1px solid rgb(229,231,235)
    box-shadow: 0px 1px 2px 0px rgb(0, 0, 0, 0.05)
    position: relative
    user-select: none
    outline: none
    cursor: default
    &:focus-within
      border-color: #4b6bec
      box-shadow: 0px 0px 0px 3px hsla(219, 81%, 61%, 0.3)
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
    width: 40px
    flex-shrink: 0
    border-radius: 4px
    border: 1px solid rgb(229,231,235)
    box-shadow: 0px 1px 2px 0px rgb(0, 0, 0, 0.05)
  input
    color: inherit
    font-family: inherit
    font-size: inherit
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
