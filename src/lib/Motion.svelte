<script lang="ts">
  import {Spring, spring, Tweened, tweened} from "svelte/motion";
  import {cubicOut, elasticOut} from "svelte/easing";
  import {fade, fly} from "svelte/transition";

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

  let toggleAnimation: boolean = false;

  let count: number = 0;
  let y: number;
  function handleCounterUpdate(increment: boolean) {
    if(increment) {
      count++;
      y = -20;
    } else {
      count--;
      y = 20;
    }
  }

  function customAnimation(_node, {
    duration = 500,
  }) {
    return {
      delay: 0,
      duration,
      easing: elasticOut,
      css: tick => { // will be translated into a CSS animation -> can be any css property
        return `
          transform: scale(${tick});
          color: hsl(
						${Math.trunc(tick * 360)},
						${Math.min(100, 1000 - 1000 * tick)}%,
						${Math.min(50, 500 - 500 * tick)}%
					);
        `;
      }
    };
  }
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

<h4>Transitions</h4>
{#if toggleAnimation}
  <span transition:customAnimation={{ duration: 1500 }} >anim 0</span>
  <span transition:fade >anim 1</span>
  <span transition:fly={{ x: 50, duration: 250 }}>anim 2</span>
  <span in:fade out:fly={{ y: -100, duration: 300 }}>anim 3</span>
  <span transition:fade
        on:introstart={() => console.log("anim intro start")}
        on:outrostart={() => console.log("anim outro start")}
        on:introend={() => console.log("anim intro finished")}
        on:outroend={() => console.log("anim outro finished")}>
    anim 4 with events
  </span>
  <span in:fly={{ x: -20 }} out:fly={{x: 20}}>anim 5</span>
{/if}
<input type="checkbox" bind:checked={toggleAnimation}/>

<h4>animated counter</h4>
<button on:click={() => handleCounterUpdate(true)} style="z-index: 1">+</button>
<div style="position: relative; width: fit-content; height: fit-content;">
  {#key count}
    <div style="display: inline-block; position: absolute; top: 50%; left: 50%; font-size: 20px; transform: translate(-50%, -50%); "
         in:fly={{ y }}
         out:fly={{ y: -y }}>
      <span>{count}</span>
    </div>
  {/key}
</div>
<button on:click={() => handleCounterUpdate(false)} style="z-index: 1">-</button>

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