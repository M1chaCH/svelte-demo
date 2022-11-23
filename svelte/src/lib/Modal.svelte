<script lang="ts">
  let open: boolean = false;

  function clickOutside(node, params) { // custom event
    const handleClick = (event) => {
      if(!node.contains(event.target)) {
        node.dispatchEvent(new CustomEvent("outclick"));
      }
    }

    // is only executed if specific element is visible (can be used to load an image for example -> fetch image as soon as element is shown)
    console.log(params.logText + " " + params.bestText)
    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      }
    }
  }
</script>

<button on:click={() => open = !open} >Open modal</button>

{#if open }
  <div class="modal" use:clickOutside={{ logText: "modal", bestText: "opened" }} on:outclick={() => open = false}>
    <span>I am a Modal</span>
  </div>


{/if}

<style>
  .modal {
    position: fixed;
    z-index: 999;
    width: 100px;
    height: 100px;
    top: calc(50% - 100px / 2);
    left: calc(50% - 100px /2);

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: salmon;
    border-radius: 10px;
  }
</style>