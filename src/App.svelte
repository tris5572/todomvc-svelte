<script lang="ts">
  import Add from "./lib/Add.svelte";
  import Footer from "./lib/Footer.svelte";
  import Item from "./lib/Item.svelte";
  import type { Filter, Todo } from "./lib/types";

  let todos = $state<Todo[]>([
    { id: 1, title: "Example Todo Item", completed: false },
    { id: 2, title: "サンプルtodo", completed: true },
  ]);
  let filter = $state<Filter>("all");

  let filteredTodos = $derived.by(() => {
    if (filter === "active") {
      return todos.filter((t) => !t.completed);
    }
    if (filter === "completed") {
      return todos.filter((t) => t.completed);
    }
    return todos;
  });

  /** TODO アイテムを追加する */
  function addTodo(todo: Todo) {
    todos.push(todo);
  }

  /** TODO アイテムのタイトルを編集する */
  function editTodoTitle(id: number, title: string) {
    todos = todos.map((t) =>
      t.id === id ? { id, title, completed: t.completed } : t,
    );
  }

  /** 指定した ID の TODO アイテムを削除する */
  function deleteTodo(id: number) {
    todos = todos.filter((t) => t.id !== id);
  }

  /** 完了した TODO アイテムを削除する*/
  function clearCompleted() {
    todos = todos.filter((t) => !t.completed);
  }
</script>

<main>
  <h1>TodoMVC Svelte</h1>
  <Add onAdd={addTodo} />
  <div class="items">
    <!-- #each で回した要素を直接使用すると、各アイテムが一時的な参照になって bind で更新できないためインデックスアクセスする -->
    {#each filteredTodos as _, i}
      <Item
        bind:todo={filteredTodos[i]}
        onDelete={deleteTodo}
        {editTodoTitle}
      />
    {/each}
  </div>
  <Footer
    remaining={todos.filter((t) => !t.completed).length}
    bind:filter
    {clearCompleted}
  />
</main>

<style>
  main {
    width: 40rem;
    margin: 0 auto;
  }

  h1 {
    padding: 0.6rem 0;
    color: var(--brand);
    text-align: center;
  }

  .items {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
</style>
