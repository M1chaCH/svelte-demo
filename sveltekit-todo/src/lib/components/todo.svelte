<script lang="ts">
    import type {TodoDTO} from "$lib/types/TodoTypes";
    import {createEventDispatcher} from "svelte";

    export let todo: TodoDTO;
    const dispatch = createEventDispatcher();

    $: dateString = todo.createdOn.toLocaleDateString();

    function toggleChecked() {
        todo.done = !todo.done;
        dispatch("doneChange", { todo });
    }
</script>

<div class="todo" style:background-color="{todo.done ? 'darksalmon' : 'bisque'}" on:click={toggleChecked}>
    <div class="header">
        <h3>{todo.title}</h3>
        <input type="checkbox" bind:checked={todo.done} on:change={toggleChecked}/>
    </div>

    {#if todo.description}
        <hr/>
        <p>{todo.description}</p>
    {/if}

    <div class="footer">
        <span>{dateString}</span>
    </div>
</div>



<style lang="scss">
  .todo{
    border-radius: 20px;
    padding: 20px;
    width: 400px;
    cursor: pointer;

    .header {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;

      h3 {
        padding: 0;
        margin: 0;

        font-weight: bold;
        font-size: 20px;
      }
    }

    .footer {
      font-size: 12px;
      font-style: italic;
    }
  }
</style>