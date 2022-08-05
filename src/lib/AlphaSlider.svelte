<script lang="ts">
  import type { Color } from '$lib/color'
  import Slider from './Slider.svelte'

  export let color: Color
  export let onInput: (color: number) => void = () => {
    /* noop */
  }
</script>

<Slider
  bind:value={color.a}
  {color}
  max={1}
  handleColor="hsla({color.h},{color.s * 100}%,{color.v * 100}%,{color.a})"
  style="alpha"
  {onInput}
/>
