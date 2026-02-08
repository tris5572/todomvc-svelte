<script lang="ts">
  import Add from "./lib/Add.svelte";
  import Footer from "./lib/Footer.svelte";
  import Item from "./lib/Item.svelte";
  import {
    addTodo,
    clearCompleted,
    deleteTodo,
    editTodoTitle,
    getTodos,
  } from "./lib/todos.svelte";
  import type { Filter } from "./lib/types";

  let filter = $state<Filter>("all");

  let filteredTodos = $derived.by(() => {
    const todos = getTodos();
    if (filter === "active") {
      return todos.filter((t) => !t.completed);
    }
    if (filter === "completed") {
      return todos.filter((t) => t.completed);
    }
    return todos;
  });
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
    remaining={getTodos().filter((t) => !t.completed).length}
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
