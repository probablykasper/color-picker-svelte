<script lang="ts">
  import type { Color } from '$lib/color'
  import Slider from './Slider.svelte'

  export let color: Color
  export let onInput: (color: number) => void = () => {
    /* noop */
  }
</script>

<Slider
  bind:value={color.h}
  {color}
  max={360}
  handleColor="hsl({color.h},100%,50%)"
  style="hue"
  {onInput}
/>
