import type { Todo } from "./types";

let todos = $state<Todo[]>([]);

/** TODO のリストを取得する */
export function getTodos() {
  return todos;
}

/** TODO アイテムを追加する */
export function addTodo(todo: Todo) {
  todos.push(todo);
}

/** TODO アイテムのタイトルを編集する */
export function editTodoTitle(id: number, title: string) {
  todos = todos.map((t) =>
    t.id === id ? { id, title, completed: t.completed } : t,
  );
}

/** 指定した ID の TODO アイテムを削除する */
export function deleteTodo(id: number) {
  todos = todos.filter((t) => t.id !== id);
}

/** 完了した TODO アイテムを削除する*/
export function clearCompleted() {
  todos = todos.filter((t) => !t.completed);
}

/** テスト用: TODO リストをリセットする */
export function resetTodos() {
  todos = [];
}
