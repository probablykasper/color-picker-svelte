<script lang="ts">
  import { Color } from './color.svelte.js'
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
  bind:value={color.a}
  {color}
  max={1}
  handleColor="hsla({color.h},{color.s * 100}%,{color.v * 100}%,{color.a})"
  style="alpha"
  {onInput}
/>
