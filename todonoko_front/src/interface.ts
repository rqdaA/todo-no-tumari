interface User {
  name: string;
  discord_id: number | undefined;
  created_at: number; // TODO: change to Date
  todoList: TodoItem[]; // TODO: rename snake_case
}

interface TodoItem {
  id: number;
  name: string;
  done: boolean;
}
