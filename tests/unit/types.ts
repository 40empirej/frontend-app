// types.ts
import { Action, ActionCreator, Reducer } from 'redux';

export interface RootState {
  todos: TodoState;
  filters: FilterState;
}

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  visibilityFilter: Filter;
}

export enum Filter {
  ALL = 'all',
  COMPLETED = 'completed',
  UNCOMPLETED = 'uncompleted'
}

export interface FilterState {
  filter: Filter;
}

export interface TodoAction {
  type: TodoActionTypes;
  todo?: Todo;
  id?: string;
}

export enum TodoActionTypes {
  ADD_TODO = 'ADD_TODO',
  TOGGLE_TODO = 'TOGGLE_TODO',
  DELETE_TODO = 'DELETE_TODO',
  EDIT_TODO = 'EDIT_TODO',
  FILTER_TODO = 'FILTER_TODO',
}

export const addTodo: ActionCreator<TodoAction> = (text: string) => ({
  type: TodoActionTypes.ADD_TODO,
  todo: { id: crypto.randomUUID(), text, completed: false },
});

export const toggleTodo: ActionCreator<TodoAction> = (id: string) => ({
  type: TodoActionTypes.TOGGLE_TODO,
  id,
});

export const deleteTodo: ActionCreator<TodoAction> = (id: string) => ({
  type: TodoActionTypes.DELETE_TODO,
  id,
});

export const editTodo: ActionCreator<TodoAction> = (id: string, text: string) => ({
  type: TodoActionTypes.EDIT_TODO,
  id,
  todo: { id, text, completed: false },
});

export const filterTodo: ActionCreator<TodoAction> = (filter: Filter) => ({
  type: TodoActionTypes.FILTER_TODO,
  filter,
});

export const todoReducer: Reducer<TodoState> = (state: TodoState = { todos: [], visibilityFilter: Filter.ALL }, action: TodoAction) => {
  switch (action.type) {
    case TodoActionTypes.ADD_TODO:
      return {...state, todos: [...state.todos, action.todo!] };
    case TodoActionTypes.TOGGLE_TODO:
      return {...state, todos: state.todos.map(todo => (todo.id === action.id? {...todo, completed:!todo.completed } : todo)) };
    case TodoActionTypes.DELETE_TODO:
      return {...state, todos: state.todos.filter(todo => todo.id!== action.id) };
    case TodoActionTypes.EDIT_TODO:
      return {...state, todos: state.todos.map(todo => (todo.id === action.id? {...todo, text: action.todo!.text } : todo)) };
    case TodoActionTypes.FILTER_TODO:
      return {...state, visibilityFilter: action.filter };
    default:
      return state;
  }
};