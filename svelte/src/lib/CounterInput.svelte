<script lang="ts">
  import {createEventDispatcher} from "svelte";

  export let count: number = 12;
  const dispatch = createEventDispatcher();

  $: {
    if(count === 20)
      dispatch("reached", count);
  }

  export function executeMeFromAnywhere() {
    console.log("I'm executed from anywhere");
  }
</script>

<div>
  <button on:click={() => count++}>+</button>
  <button on:click={() => count--}>-</button>
</div>

<style lang="scss">
  div {
    button {
      width: 20px;
      height: 20px;
      background: red;
    }
  }
</style>