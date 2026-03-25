export type User = {
  id: number;
  username: string;
};

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

export type TodoList = Todo[];

export type TodoUpdate = {
  title?: string;
  completed?: boolean;
};

export type Response<T> = {
  data: T;
  error?: string;
};