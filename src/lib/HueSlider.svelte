<script lang="ts">
  import type { Color } from '$lib/color'
  import Slider from './Slider.svelte'

  export let color: Color
</script>

<Slider bind:value={color.h} max={360} backgroundColor={`hsl(${color.h},100%,50%)`} />
