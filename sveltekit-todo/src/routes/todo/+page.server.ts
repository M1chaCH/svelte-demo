import type { PageServerLoad } from './$types';
import type {TodoDTO} from "$lib/types/TodoTypes";

export const load: PageServerLoad = async () => {
    const data: TodoDTO[] = [
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

    return data;
}