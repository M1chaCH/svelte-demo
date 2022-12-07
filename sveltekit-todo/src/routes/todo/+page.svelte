<script lang="ts">
    import Todo from '$lib/components/Todo.svelte';
    import type {TodoDTO} from "$lib/types/TodoTypes";
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import CreateTodo from "$lib/components/CreateTodo.svelte";
    import type {ActionData} from "./$types";
    import {page} from "$app/stores";

    export let form: ActionData;

    let todos: TodoDTO[] = [];
    let doneTodos: TodoDTO[] = [];

    $page.data.todos.forEach((todo: TodoDTO) => {
       if(todo.done)
           doneTodos.push(todo);
       else
           todos.push(todo);

        todos = todos.sort(sortByTitle);
        doneTodos = doneTodos.sort(sortByTitle);
    });

    const doneChange = (event) => {
        let changedTodo: TodoDTO = event.detail.todo;
        if(changedTodo.done === true) {
            doneTodos.push(changedTodo);
            todos = todos.filter(todo => !todo.done);
        }else {
            todos.push(changedTodo);
            doneTodos = doneTodos.filter(todo => todo.done);
        }

        todos = todos.sort(sortByTitle);
        doneTodos = doneTodos.sort(sortByTitle);
    };

    function sortByTitle(todo1: TodoDTO, todo2: TodoDTO): number {
        return todo1.title.localeCompare(todo2.title);
    }

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),
    });
</script>

<CreateTodo bind:form/>

<h1>TODOs</h1>
<div class="todos">
    {#each todos as todo (todo.id)}
        <div in:receive="{{key: todo.id}}"
             out:send="{{key: todo.id}}"
             animate:flip="{{duration: 200}}">
            <Todo bind:todo on:doneChange={doneChange} />
        </div>

    {/each}
    {#each doneTodos as todo (todo.id)}
        <div in:receive="{{key: todo.id}}"
             out:send="{{key: todo.id}}"
             animate:flip="{{duration: 200}}">
            <Todo bind:todo on:doneChange={doneChange} />
        </div>
    {/each}
</div>

<style lang="scss">
    .todos {
      display: flex;
      flex-flow: column wrap;
      gap: 20px;

      justify-content: center;

      transition: all 300ms ease-out;
    }
</style>