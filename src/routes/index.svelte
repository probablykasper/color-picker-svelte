<script lang="ts">
  import { Color } from '$lib/color'
  import ColorInput from '$lib/ColorInput.svelte'

  let color = new Color('#00ff9d')
  $: console.log(color)
</script>

<div class="center">
  <h1 style:color={color.toHex()}>Color Picker Svelte</h1>

  <ColorInput bind:color title="Text color" --input-width="250px" />
</div>

<style lang="sass">
  .center
    display: flex
    flex-direction: column
    align-items: center
    color: #000000
</style>
