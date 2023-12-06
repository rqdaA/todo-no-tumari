export interface User {
    name: string;
    discord_id: number | undefined;
    created_at: Date; // TODO: change to Date
    todo_list: TodoItem[];
}

export interface TodoItem {
    id: number;
    name: string;
    done: boolean;
}
