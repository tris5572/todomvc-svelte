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

  /** 指定した ID の TODO アイテムを削除する */
  function deleteTodo(id: number) {
    todos = todos.filter((t) => t.id !== id);
  }
</script>

<main>
  <Add onAdd={addTodo} />
  <div>
    <!-- #each で回した要素を直接使用すると、各アイテムが一時的な参照になって bind で更新できないためインデックスアクセスする -->
    {#each filteredTodos as _, i}
      <Item bind:todo={filteredTodos[i]} onDelete={deleteTodo} />
    {/each}
  </div>
  <Footer remaining={todos.filter((t) => !t.completed).length} bind:filter />
</main>

<style>
</style>
