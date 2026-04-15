<script lang="ts">
  import type { Color } from '$lib/color.svelte.js'
  import Slider from './Slider.svelte'

  interface Props {
    color: Color
    onInput?: (color: number) => void /* noop */
  }

  let {
    color = $bindable(),
    onInput = () => {
      /* noop */
    },
  }: Props = $props()
</script>

<Slider
  bind:value={color.h}
  {color}
  max={360}
  handleColor="hsl({color.h},100%,50%)"
  style="hue"
  {onInput}
/>
