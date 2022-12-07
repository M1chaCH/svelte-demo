import type {Actions, PageServerLoad} from './$types';
import type {TodoDTO} from "$lib/types/TodoTypes";
import {invalid} from "@sveltejs/kit";

const todos: TodoDTO[] = [
    {
        id: crypto.randomUUID(),
        title: "Main TODO",
        createdOn: new Date(),
        done: false,
    },
    {
        id: crypto.randomUUID(),
        title: "Secondary TODO",
        createdOn: new Date(),
        done: false,
    },
    {
        id: crypto.randomUUID(),
        title: "Third TODO",
        description: "This is a random description",
        createdOn: new Date(),
        done: false,
    },
    {
        id: crypto.randomUUID(),
        title: "Done TODO",
        createdOn: new Date(),
        description: "hehe here we wright text",
        done: true,
    },
];

export const load: PageServerLoad = async () => {
    return { todos };
}

export const actions: Actions = {
    addTodo: async ({ request }) => {
        const data = await request.formData();
        const title: FormDataEntryValue | null = data.get("title");
        const description: FormDataEntryValue | null = data.get("description");

        if(!title) {
            console.log("invalid, title can't be null")
            return invalid(400, { message: "title can't be empty", empty: true })
        }

        if(todos.find(todo => todo.title === title))
            return invalid(400, { duplicate: true, message: "Title already exists" })

        const newTodo: TodoDTO = {
            id: crypto.randomUUID(),
            title: title as string,
            description: description as string,
            done: false,
            createdOn: new Date(),
        }
        todos.push(newTodo);

        return { success: true }
    }
};