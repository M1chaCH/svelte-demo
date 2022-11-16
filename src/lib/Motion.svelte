<script lang="ts">

  import {Spring, spring, Tweened, tweened} from "svelte/motion";
  import {cubicOut} from "svelte/easing";

  let progress: Tweened<number> = tweened<number>(0, { // basically returns a store
    // delay: 1000,
    duration: 1000,
    // easing: (t) => t * t, // write your own easing function
    easing: cubicOut
  });

  type Coordinates = {
    x: number,
    y: number
  };

  let coordinates: Spring<Coordinates> = spring<Coordinates>({ x: 20, y: 20 }, {
    stiffness: 0.1,
    damping: 0.4
  });
  let size: Spring<number> = spring<number>(10, {
    stiffness: 0.1,
    damping: 0.4
  });

</script>

<h4>Motion</h4>
<progress value={$progress}></progress>
<div>
  <button on:click={() => progress.set(0)}>0%</button>
  <button on:click={() => progress.set(0.25)}>25%</button>
  <button on:click={() => progress.set(0.50)}>50%</button>
  <button on:click={() => progress.set(0.75)}>75%</button>
  <button on:click={() => progress.set(1)}>100%</button>
</div>
<svelte:window on:mousemove={e => coordinates.set({ x: e.clientX, y: e.clientY })}
               on:mousedown={() => size.set(7)}
               on:mouseup={() => size.set(10)}/>
<div class="cursor-background-layer">
  <svg>
    <circle cx={$coordinates.x} cy={$coordinates.y}  r={$size}/>
  </svg>
</div>

<style lang="scss">
  .cursor-background-layer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none;

    svg {
      pointer-events: none;
      width: 100%;
      height: 100%;

      fill: rgba(0, 0, 0, 0.1);
    }
  }
</style>