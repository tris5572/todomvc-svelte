<script lang="ts">
  import Add from "./lib/Add.svelte";
  import Footer from "./lib/Footer.svelte";
  import Item from "./lib/Item.svelte";
  import type { Todo } from "./lib/types";

  let todos = $state<Todo[]>([
    { id: 1, title: "Example Todo Item", completed: false },
    { id: 2, title: "サンプルtodo", completed: true },
  ]);

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
    <!-- `#each todos as todo` だと、todo が一時的な参照になって更新できないためインデックスアクセスする -->
    {#each todos as _, i}
      <Item bind:todo={todos[i]} onDelete={deleteTodo} />
    {/each}
  </div>
  <Footer remaining={todos.filter((t) => !t.completed).length} />
</main>

<style>
</style>
