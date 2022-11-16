<script>

  import {afterUpdate, beforeUpdate, onDestroy, onMount} from "svelte";

  let b = false;

  let i = 0;
  let interval = setInterval(() => {
    i++;
    if(i === 5) clearInterval(interval);

    b = !b;
    console.log("interval tick")
  }, 1000);

  beforeUpdate(() => console.log("Lifecycle hook: beforeUpdate")); // before changes rendered in DOM

  onMount(() => { // after changes rendered in DOM
    console.log("Lifecycle hook: onMount");
    return () => {
      console.log("Lifecycle hook: onDestroy (but from onMount return)"); // when component is destroyed (after onDestroy)
    };
  });

  afterUpdate(() => console.log("Lifecycle hook: afterUpdate")); // after update was executed to the component in the dom

  onDestroy(() => { // when component is destroyed
    console.log("Lifecycle hook: onDestroy");
    clearInterval(interval);
  });
</script>

<div>
  here, {b}
</div>