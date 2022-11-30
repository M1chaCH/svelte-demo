export type TodoDTO = {
    id: string,
    title: string,
    description?: string,
    createdOn: Date,
    done: boolean,
}