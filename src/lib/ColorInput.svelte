<script lang="ts">
  import { TinyColor } from '@ctrl/tinycolor'
  import { Color } from './color.svelte.js'
  import ColorPicker from './ColorPicker.svelte'
  import { checkShortcut } from './util.js'
  import { Position } from '$lib/index.js'
  import type { Snippet } from 'svelte'

  let inputElement: HTMLInputElement | undefined = $state()
  interface Props {
    color: Color
    title?: string
    isOpen?: boolean
    showAlphaSlider?: boolean
    disabled?: boolean
    onInput?: () => void
    /* noop */
    onClose?: () => void
    class?: string
    position?: Position
    children?: Snippet<[{ isOpen: boolean }]>
  }

  let {
    color = $bindable(),
    title = 'Color',
    isOpen = $bindable(false),
    showAlphaSlider = false,
    disabled = false,
    onInput = () => {
      /* noop */
    },
    onClose = () => {
      /* noop */
    },
    class: classes = '',
    position = $bindable(Position.Auto),
    children,
  }: Props = $props()

  let wasOpen = isOpen
  $effect(() => {
    if (wasOpen === true && isOpen === false) {
      onClose()
    }
    wasOpen = isOpen
  })

  $effect(() => {
    if (
      color.h !== lastColor.h ||
      color.s !== lastColor.s ||
      color.v !== lastColor.v ||
      color.a !== lastColor.a
    ) {
      text = color.a === 1 ? color.toHexString() : color.toHex8String()
      lastColor = new Color(color)
    }
  })

  let text = $state(color.a === 1 ? color.toHexString() : color.toHex8String())
  let lastColor = new Color(color)

  function textInputHandler() {
    const tinyColor = new TinyColor(text)
    if (tinyColor.isValid) {
      color = new Color(tinyColor.toHsv())
      lastColor = color
    }
    onInput()
  }

  let parent: HTMLElement | undefined = $state()
  function focusout(e: FocusEvent) {
    if (e.relatedTarget === null) {
      isOpen = false
    } else if (e.relatedTarget instanceof HTMLElement) {
      const stayingInParent = parent?.contains(e.relatedTarget)
      if (!stayingInParent) {
        isOpen = false
      }
    }
  }

  function keydown(e: KeyboardEvent) {
    if (checkShortcut(e, 'Escape')) {
      isOpen = false
    } else if (checkShortcut(e, 'Enter')) {
      open()
    }
  }

  function open() {
    if (!isOpen && !disabled) {
      isOpen = true
      inputElement?.focus()
      inputElement?.select()
      return true
    }
  }
  function openAndPreventDefault(e: Event) {
    if (open()) {
      e.preventDefault()
    }
  }

  function init(el: HTMLDivElement) {
    if (document.activeElement === el) {
      isOpen = true
    }
  }
</script>

<!-- tabindex=-1 to keep picker open when picker is clicked -->
<div
  bind:this={parent}
  class="input {classes}"
  class:disabled
  onmousedown={openAndPreventDefault}
  onkeydown={keydown}
  onfocusout={focusout}
  tabindex={disabled ? null : -1}
  role="button"
  aria-label="Open color picker"
>
  <div class="color-frame">
    <div class="color-frame-color" style:background-color={color.toHex8String()}></div>
  </div>
  <div class="text">
    <input
      class:show={isOpen}
      bind:this={inputElement}
      type="text"
      bind:value={text}
      oninput={textInputHandler}
      onfocus={open}
      {disabled}
      use:init
    />
    <span class:show={!isOpen} class="title">{title}</span>
  </div>
  {#if children}
    {@render children({ isOpen })}
  {:else}
    <ColorPicker
      positioningContextElement={inputElement}
      bind:color
      {onInput}
      {isOpen}
      {position}
      {showAlphaSlider}
    />
  {/if}
</div>

<style lang="sass">
  .input
    width: var(--input-width, 100%)
    display: flex
    justify-items: center
    align-items: center
    box-sizing: border-box
    border-radius: 4px
    padding: 0px 10px
    background: var(--picker-background, #ffffff)
    border: 1px solid hsla(222, 14%, 47%, 0.3)
    box-shadow: 0px 1px 2px 0px rgb(0, 0, 0, 0.05)
    position: relative
    user-select: none
    outline: none
    cursor: default
    &.disabled
      opacity: 0.5
    &:focus-within
      border-color: #0269f7
      box-shadow: 0px 0px 0px 3px rgba(2, 105, 247, 0.4)
  .text
    position: relative
  .title
    position: absolute
    top: 0px
    left: 0px
    width: 100%
    pointer-events: none
    display: none
    &.show
      display: block
  .color-frame
    pointer-events: none
    height: 20px
    margin: 8px 0px
    margin-right: 11px
    width: 38px
    flex-shrink: 0
    border-radius: 4px
    box-sizing: border-box
    box-shadow: 0px 1px 2px 0px rgb(0, 0, 0, 0.05)
    background-image: repeating-conic-gradient(#cccccc 0 25%, #ffffff 0 50%)
    background-size: 0.5rem 0.5rem
    background-position: 0 0, 0.25rem 0.25rem
    .color-frame-color
      width: 100%
      height: 100%
      box-sizing: border-box
      border-radius: inherit
      border: 1px solid hsla(0, 0%, 100%, 0.3)
  input
    color: inherit
    font-family: inherit
    font-size: inherit
    background-color: transparent
    width: 100%
    outline: none
    border: none
    padding: 0px
    margin: 0px
    opacity: 0
    cursor: inherit
    line-height: normal
    &:focus
      box-shadow: none
    &.show
      opacity: 1
      cursor: text
</style>
