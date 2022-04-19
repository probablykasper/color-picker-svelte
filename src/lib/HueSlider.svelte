<script lang="ts">
  import type { Color } from '$lib/color'

  export let color: Color
</script>

<input type="range" bind:value={color.h} max={360} step={0.001} />
