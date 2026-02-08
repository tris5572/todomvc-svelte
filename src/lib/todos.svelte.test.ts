import { describe, expect, test, beforeEach, vi } from "vitest";
import type { Todo } from "./types";
import {
  getTodos,
  addTodo,
  editTodoTitle,
  deleteTodo,
  clearCompleted,
  resetTodos,
} from "./todos.svelte";

let testIdCounter = 0;

/**
 * テスト用のTODOオブジェクトを生成するファクトリー関数
 * @param overrides - デフォルト値を上書きするプロパティ
 */
function createTestTodo(overrides?: Partial<Todo>): Todo {
  const defaultTodo: Todo = {
    id: ++testIdCounter,
    title: `Test TODO ${testIdCounter}`,
    completed: false,
  };
  return { ...defaultTodo, ...overrides };
}

beforeEach(() => {
  resetTodos();
  testIdCounter = 0; // 各テスト前にカウンターをリセット
});

describe("todos", () => {
  describe("getTodos", () => {
    test("初期状態のTODOリストを取得できる", () => {
      const todos = getTodos();

      expect(Array.isArray(todos)).toBe(true);
      expect(todos).toHaveLength(0);
    });

    test("追加されたTODOを取得できる", () => {
      const newTodo = createTestTodo();
      addTodo(newTodo);

      const todos = getTodos();

      expect(todos).toHaveLength(1);
      expect(todos[0]).toEqual(newTodo);
    });
  });

  describe("addTodo", () => {
    test("新しいTODOアイテムを追加できる", () => {
      const newTodo = createTestTodo({ title: "新しいTODO" });
      const initialLength = getTodos().length;

      addTodo(newTodo);

      const todos = getTodos();
      expect(todos).toHaveLength(initialLength + 1);
      expect(todos[todos.length - 1]).toEqual(newTodo);
    });

    test("完了済みのTODOアイテムも追加できる", () => {
      const completedTodo = createTestTodo({
        title: "完了TODO",
        completed: true,
      });
      const initialLength = getTodos().length;

      addTodo(completedTodo);

      const todos = getTodos();
      expect(todos).toHaveLength(initialLength + 1);
      expect(todos[todos.length - 1].completed).toBe(true);
    });
  });

  describe("editTodoTitle", () => {
    test("既存のTODOアイテムのタイトルを編集できる", () => {
      const testTodo = createTestTodo({ title: "編集前" });
      addTodo(testTodo);
      const newTitle = "編集後";

      editTodoTitle(testTodo.id, newTitle);

      const editedTodo = getTodos().find((t) => t.id === testTodo.id);
      expect(editedTodo).toBeDefined();
      expect(editedTodo?.title).toBe(newTitle);
      expect(editedTodo?.completed).toBe(false);
    });

    test("編集時に完了状態はそのまま維持される", () => {
      const testTodo = createTestTodo({
        title: "完了済みTODO",
        completed: true,
      });
      addTodo(testTodo);
      const newTitle = "新しいタイトル";

      editTodoTitle(testTodo.id, newTitle);

      const editedTodo = getTodos().find((t) => t.id === testTodo.id);
      expect(editedTodo?.completed).toBe(true);
      expect(editedTodo?.title).toBe(newTitle);
    });

    test("存在しないIDを指定しても他のTODOに影響しない", () => {
      const testTodo = createTestTodo();
      addTodo(testTodo);
      const initialLength = getTodos().length;

      editTodoTitle(99999, "存在しないID");

      expect(getTodos()).toHaveLength(initialLength);
      expect(getTodos().find((t) => t.id === testTodo.id)).toEqual(testTodo);
    });
  });

  describe("deleteTodo", () => {
    test("指定したIDのTODOアイテムを削除できる", () => {
      const testTodo = createTestTodo({ title: "削除対象のTODO" });
      addTodo(testTodo);
      const beforeLength = getTodos().length;

      deleteTodo(testTodo.id);

      expect(getTodos()).toHaveLength(beforeLength - 1);
      expect(getTodos().find((t) => t.id === testTodo.id)).toBeUndefined();
    });

    test("存在しないIDを指定しても他のTODOに影響しない", () => {
      const testTodo = createTestTodo();
      addTodo(testTodo);
      const initialLength = getTodos().length;

      deleteTodo(99999);

      expect(getTodos()).toHaveLength(initialLength);
      expect(getTodos().find((t) => t.id === testTodo.id)).toBeDefined();
    });
  });

  describe("clearCompleted", () => {
    test("完了したTODOアイテムのみを削除できる", () => {
      const activeTodo = createTestTodo({
        title: "未完了TODO",
        completed: false,
      });
      const completedTodo1 = createTestTodo({
        title: "完了TODO 1",
        completed: true,
      });
      const completedTodo2 = createTestTodo({
        title: "完了TODO 2",
        completed: true,
      });

      addTodo(activeTodo);
      addTodo(completedTodo1);
      addTodo(completedTodo2);

      clearCompleted();

      const todos = getTodos();
      expect(todos).not.toContainEqual(completedTodo1);
      expect(todos).not.toContainEqual(completedTodo2);
      expect(todos).toContainEqual(activeTodo);
      expect(todos.filter((t) => t.completed)).toHaveLength(0);
    });

    test("未完了のTODOは削除されない", () => {
      const activeTodo = createTestTodo({
        title: "未完了TODO",
        completed: false,
      });
      addTodo(activeTodo);
      const initialLength = getTodos().length;

      clearCompleted();

      const todos = getTodos();
      expect(todos).toHaveLength(initialLength);
      expect(todos).toContainEqual(activeTodo);
    });

    test("完了したTODOがない場合、リストは変わらない", () => {
      const activeTodo = createTestTodo({ completed: false });
      addTodo(activeTodo);
      const initialLength = getTodos().length;

      clearCompleted();

      expect(getTodos()).toHaveLength(initialLength);
    });
  });
});
