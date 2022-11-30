<script lang="ts">
    import type { PageData } from "./$types";
    import Todo from '$lib/components/Todo.svelte';
    import type {TodoDTO} from "$lib/types/TodoTypes";
    import { quintOut } from 'svelte/easing';
    import { crossfade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    export let data: PageData[];
    data = Object.values(data);

    let todos: TodoDTO[] = [];
    let doneTodos: TodoDTO[] = [];

    data.forEach((todo: TodoDTO) => {
       if(todo.done)
           doneTodos.push(todo);
       else
           todos.push(todo);
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

<h1>TODOs</h1>
<div class="todos">
    {#each todos as todo (todo.id)}
        <div in:receive="{{key: todo.id}}"
             out:send="{{key: todo.id}}"
             animate:flip="{{duration: 200}}">
            <Todo bind:todo on:doneChange={doneChange}></Todo>
        </div>

    {/each}
    {#each doneTodos as todo (todo.id)}
        <div in:receive="{{key: todo.id}}"
             out:send="{{key: todo.id}}"
             animate:flip="{{duration: 200}}">
            <Todo bind:todo on:doneChange={doneChange}></Todo>
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